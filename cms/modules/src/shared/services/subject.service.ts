import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Page, Block, Media } from '@angular-cms/core';

@Injectable({
  // we declare that this service should be created
  // by the root application injector.
  providedIn: 'root',
})
export class SubjectService {

  blockFolderCreated$: Subject<Block> = new Subject<Block>();
  blockCreated$: Subject<Block> = new Subject<Block>();

  mediaFolderCreated$: Subject<Media> = new Subject<Media>();
  mediaCreated$: Subject<Media> = new Subject<Media>();

  pageCreated$: Subject<Page> = new Subject<Page>();
  pageSelected$: Subject<Page> = new Subject<Page>();

  fireBlockFolderCreated(createdBlockFolder: Block) {
    this.blockFolderCreated$.next(createdBlockFolder);
  }

  fireBlockCreated(createdBlock: Block) {
    this.blockCreated$.next(createdBlock);
  }

  fireMediaFolderCreated(createdMediaFolder: Media) {
    this.mediaFolderCreated$.next(createdMediaFolder);
  }

  fireMediaCreated(createdMedia: Media) {
    this.mediaCreated$.next(createdMedia);
  }

  firePageCreated(createdPage: Page) {
    this.pageCreated$.next(createdPage);
  }

  firePageSelected(selectedPage: Page) {
    this.pageSelected$.next(selectedPage);
  }
}
