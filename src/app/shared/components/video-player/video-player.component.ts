import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit, AfterViewInit {
  @Input() srcUrl: string;
  @Input() poster: string;
  @ViewChild('videoElement', { static: false }) videoElement: ElementRef;
  currentTime: any;
  duration: any;
  timeInterval: any;
  constructor() {}

  ngOnInit(): void {
    this.currentTime = null;
    console.log(this.srcUrl, this.poster);
  }

  ngAfterViewInit() {
    const videoTag = this.videoElement.nativeElement as HTMLVideoElement;
    this.currentTime = 0;

    videoTag.addEventListener('loadeddata', () => {
      this.duration = videoTag.duration;
    });
    videoTag.addEventListener('play', () => {
      this.play();
      this.timeInterval = window.setInterval(() => {
        this.currentTime = videoTag.currentTime;
      }, 1000);
    });
    videoTag.addEventListener('pause', () => {
      this.pause();
      clearInterval(this.timeInterval);
    });
  }

  play() {
    const videoTag = this.videoElement.nativeElement as HTMLVideoElement;
    videoTag.play();
  }

  pause() {
    const videoTag = this.videoElement.nativeElement as HTMLVideoElement;
    videoTag.pause();
  }

  seek(seekType: string) {
    const forward = seekType === 'FORWARD' ? true : false;
    const videoTag = this.videoElement.nativeElement as HTMLVideoElement;
    const time = videoTag.currentTime + (forward ? 10 : -10);
    videoTag.currentTime =
      time <= this.duration || time >= 0 ? time : forward ? this.duration : 0;
  }

  stop() {
    const videoTag = this.videoElement.nativeElement as HTMLVideoElement;
    videoTag.currentTime = 0;
    this.pause();
  }

  getDuration(): string {
    return (this.duration / 60).toFixed(2);
  }

  getCurrentTime(): string {
    const mins = this.currentTime / 60;
    const seconds = this.currentTime % 59;
    return (
      (mins < 10 ? '0' : '') +
      mins.toFixed(0) +
      ':' +
      (seconds < 10 ? '0' : '') +
      seconds.toFixed(0)
    );
  }
}
