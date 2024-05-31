import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})

export class HomeComponent {
  imageUrls: string[] = [
    '../../assets/images/Bags/Bags.jpg',
    '../../assets/images/Beanies/Beanies.jpg',
    '../../assets/images/Beards/Beard.jpg',
    '../../assets/images/Belts/Belt.jpg',
    '../../assets/images/Bracelets/Bracelet.jpg',
    '../../assets/images/Ear-Cuff/Ear-cuff.jpg',
    '../../assets/images/Earrings/Earring.jpg',
    '../../assets/images/Gloves/Gloves.jpg',
    '../../assets/images/Hair-Clips/Hair-clips.jpg',
    '../../assets/images/Hats/Hat.jpg',
    '../../assets/images/HeadBands/HeadBand.jpg',
    '../../assets/images/Necklaces/Necklace.jpg',
    '../../assets/images/Rings/Ring.jpg',
    '../../assets/images/Scarves/Scarves.jpg',
    '../../assets/images/Scrunchies/Scrunchie.jpg',
    '../../assets/images/SilkScarve/SilkScarve.jpg',
    '../../assets/images/Sunglasses/Sunglasses.jpg',
    '../../assets/images/Wallets/Wallet.jpg',
  ];

  getImageName(imageUrl: string): string {
    // Extracts the file name without extension from the URL
    return imageUrl.split('/').pop()?.split('.')[0] || '';
  }

}