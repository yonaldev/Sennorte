import { InMemoryDbService } from 'angular-in-memory-web-api';

import { AcademyFakeDb } from 'app/fake-db/academy';

export class FakeDbService implements InMemoryDbService
{
    createDb(): any
    {
        return {
            // Academy
            'academy-categories': AcademyFakeDb.categories,
            'academy-courses'   : AcademyFakeDb.courses,
            'academy-course'    : AcademyFakeDb.course,

        };
    }
}
