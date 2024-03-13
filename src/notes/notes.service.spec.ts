import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Note, NotesRepository } from './note.entity';

describe('NotesService', () => {
  let notesService: NotesService;
  let notesRepository: NotesRepository;

  const NOTES_REPOSITORY_TOKEN = getRepositoryToken(Note);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: NOTES_REPOSITORY_TOKEN,
          useValue: {
            //find: jest.fn(),
            //findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            //increment: jest.fn(),
          },
        },
      ],
    }).compile();

    notesService = module.get<NotesService>(NotesService);
    notesRepository = module.get<NotesRepository>(NOTES_REPOSITORY_TOKEN);
  });

  describe('create', () => {
    const undefNote = {
      id: undefined,
      content: undefined,
      views: undefined,
      createdAt: undefined,
      comments: undefined,
    };

    const content = 'test content';

    test('note is created from note dto', async () => {
      const createdNote = {
        ...undefNote,
        content,
      };

      const savedNote = {
        ...undefNote,
        id: 1,
        content,
        views: 0,
        createdAt: new Date(),
      };

      jest.spyOn(notesRepository, 'create').mockReturnValueOnce(createdNote);
      jest.spyOn(notesRepository, 'save').mockResolvedValueOnce(savedNote);

      const noteDto = { content };

      await expect(notesService.create(noteDto)).resolves.toBe(savedNote);

      expect(notesRepository.create).toHaveBeenCalledWith(noteDto);
      expect(notesRepository.save).toHaveBeenCalledWith(createdNote);
    });
  });
});
