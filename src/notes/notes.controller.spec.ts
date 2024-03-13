import { Test } from '@nestjs/testing';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { Note } from './note.entity';

describe('NotesController', () => {
  let notesController: NotesController;
  let notesService: NotesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        {
          provide: 'NOTES_SERVICE',
          useValue: {
            findAll: jest.fn(),
            view: jest.fn(),
            findWithComments: jest.fn(),
          },
        },
      ],
    }).compile();

    notesService = moduleRef.get<NotesService>('NOTES_SERVICE');
    notesController = moduleRef.get<NotesController>(NotesController);
  });

  describe('findAll', () => {
    it('should return an array of notes', async () => {
      const notes = [new Note()];

      jest.spyOn(notesService, 'findAll').mockResolvedValueOnce(notes);

      expect(await notesController.findAll()).toBe(notes);
    });
  });

  describe('findOne', () => {
    it('note is viewed once', async () => {
      const note = new Note();
      note.id = 123;

      await notesController.findOne(note);

      expect(notesService.view).toHaveBeenCalledWith(note.id);
      expect(notesService.view).toHaveBeenCalledTimes(1);
    });
  });
});
