import { Component, signal, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy, AfterViewInit {
  protected readonly activeRing = signal<string | null>(null);

  private intervalId?: number;
  private leftRings = ['left-1', 'left-2', 'left-3'];
  private rightRings = ['right-1', 'right-2', 'right-3'];

  ngOnInit() {
    gsap.registerPlugin(ScrollTrigger);
    this.startRingAnimation();
  }

  ngAfterViewInit() {
    this.setupScrollTriggers();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }

  private setupScrollTriggers() {
    const sections = document.querySelectorAll('.fade-in-section');

    sections.forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      });
    });
  }

  private startRingAnimation() {
    const cycleAnimation = () => {
      const randomLeft = this.leftRings[Math.floor(Math.random() * this.leftRings.length)];
      this.activeRing.set(randomLeft);

      setTimeout(() => {
        this.activeRing.set(null);
      }, 1000);

      setTimeout(() => {
        const randomRight = this.rightRings[Math.floor(Math.random() * this.rightRings.length)];
        this.activeRing.set(randomRight);

        setTimeout(() => {
          this.activeRing.set(null);
        }, 1000);
      }, 500);
    };

    cycleAnimation();
    this.intervalId = window.setInterval(cycleAnimation, 3000);
  }
}
