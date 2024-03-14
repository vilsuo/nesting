import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { Note } from '../src/notes/note.entity';
import { mainConfig } from '../src/config/mainConfig';

const content = 'test content';

describe('NotesController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // apply global validation pipe
    mainConfig(app);

    dataSource = moduleFixture.get(DataSource);
    await app.init();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  // reset notes
  beforeEach(async () => {
    await dataSource.createQueryBuilder().delete().from(Note).execute();
  });

  describe('/notes (GET)', () => {
    it('when there are no notes, empty array is returned', async () => {
      const response = await request(app.getHttpServer())
        .get('/notes')
        .expect(200);

      expect(response.body).toHaveLength(0);
    });

    it('when a note is created, the note is in the array', async () => {
      const { body: note } = await request(app.getHttpServer())
        .post('/notes')
        .send({ content })
        .expect(HttpStatus.CREATED);

      const { body: notes } = await request(app.getHttpServer())
        .get('/notes')
        .expect(HttpStatus.OK);

      expect(notes).toHaveLength(1);
      expect(notes[0]).toStrictEqual(note);
    });
  });

  describe('/notes (POST)', () => {
    it('too short content is bad request', async () => {
      const response = await request(app.getHttpServer())
        .post('/notes')
        .send({ content: '' })
        .expect(HttpStatus.BAD_REQUEST);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message[0]).toMatch(/content must be/i);
    });

    it('can create a note', async () => {
      const { body: note } = await request(app.getHttpServer())
        .post('/notes')
        .send({ content })
        .expect(HttpStatus.CREATED);

      expect(note.content).toEqual(content);
    });

    it('posted note has 0 views', async () => {
      const { body: note } = await request(app.getHttpServer())
        .post('/notes')
        .send({ content })
        .expect(HttpStatus.CREATED);

      expect(note.views).toEqual(0);
    });
  });

  describe('/notes/:noteId (GET)', () => {
    let note;

    beforeEach(async () => {
      const response = await request(app.getHttpServer())
        .post('/notes')
        .send({ content })
        .expect(HttpStatus.CREATED);

      note = response.body;
    });

    it('can not get a note that does not exist', async () => {
      const response = await request(app.getHttpServer())
        .get(`/notes/${note.id + 1}`)
        .expect(HttpStatus.NOT_FOUND);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toMatch(/note does not exist/i);
    });

    it('can get a note that exist', async () => {
      const response = await request(app.getHttpServer())
        .get(`/notes/${note.id}`)
        .expect(HttpStatus.OK);

      expect(response.body).toMatchObject({
        id: note.id,
        content: note.content,
      });
    });

    it('getting a note increments its view count', async () => {
      const { body: first } = await request(app.getHttpServer())
        .get(`/notes/${note.id}`)
        .expect(HttpStatus.OK);

      expect(first.views).toEqual(note.views + 1);

      const { body: second } = await request(app.getHttpServer())
        .get(`/notes/${note.id}`)
        .expect(HttpStatus.OK);

      expect(second.views).toEqual(first.views + 1);
    });

    it('response has comments property', async () => {
      const response = await request(app.getHttpServer())
        .get(`/notes/${note.id}`)
        .expect(HttpStatus.OK);

      expect(response.body).toHaveProperty('comments');
    });
  });
});
