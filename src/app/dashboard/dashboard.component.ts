import {Component, OnInit} from '@angular/core';
import {StreamService} from '../provider/stream.service';
import {Stream} from '../entities/stream';
import {SpaceService} from '../provider/space.service';
import {map} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  streams: Stream[] = []
  streamMap = new Map<string, Stream[]>()

  constructor(
    private spaceService: SpaceService,
    private streamService: StreamService
  ) {
  }

  ngOnInit(): void {
    this.getStreams();
  }

  getStreams(): void {
    this.streamService.getStreams("123")
      .subscribe(streams => this.streams = streams);
  }
  getSpaces(): void {
    this.spaceService.getSpaces()
      .pipe(map((spaces) => spaces.slice(1, 5)))
      .subscribe(spaces => {
        spaces.forEach(space => {
          this.streamService.getStreams(space.id).subscribe((streams) => {
            this.streamMap.set(space.id, streams)
          })
        })
      });
  }
}