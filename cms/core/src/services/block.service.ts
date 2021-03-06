import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Block } from '../models/block.model';
import { ContentService } from './content.service';
@Injectable()
export class BlockService extends ContentService<Block> {

  protected apiUrl: string = "/api/block";
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
}
