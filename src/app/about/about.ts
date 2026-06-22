import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  readonly perks = [
    {
      title: 'Certified Organic',
      desc: 'Every ingredient carries a certified organic or fair-trade mark.',
      iconPath: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'
    },
    {
      title: '48-Hour Slow Ferment',
      desc: 'Long cold fermentation develops deeper flavour and better digestibility.',
      iconPath: 'M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 6v6l4 2'
    },
    {
      title: 'Community First',
      desc: 'We donate surplus bread daily to the local shelter and food bank.',
      iconPath: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10'
    }
  ];

  readonly team = [
    {
      name: 'Astrid Lindqvist',
      initials: 'AL',
      role: 'Head Baker & Co-founder',
      bio: 'Trained in Stockholm and Copenhagen, Astrid brings 18 years of artisan bread knowledge to every bake.'
    },
    {
      name: 'Erik Solberg',
      initials: 'ES',
      role: 'Pastry Chef & Co-founder',
      bio: 'Erik spent a decade in Michelin-starred kitchens before returning to his roots and his grandmother\'s cardamom bun recipe.'
    },
    {
      name: 'Lena Dahl',
      initials: 'LD',
      role: 'Coffee Director',
      bio: 'A certified Q Grader with sourcing relationships in Ethiopia, Colombia, and Guatemala — Lena obsesses over every variable.'
    },
    {
      name: 'Mikael Berg',
      initials: 'MB',
      role: 'Operations Manager',
      bio: 'The quiet engine behind Nordic Crumb, keeping the ovens lit, the shelves stocked, and the team smiling.'
    }
  ];

  readonly values = [
    {
      stat: '48h',
      title: 'Fermentation time',
      description: 'We never rush the process. Slow fermentation is our non-negotiable.'
    },
    {
      stat: '100%',
      title: 'Organic ingredients',
      description: 'From flour to finishing salt — certified organic, every time.'
    },
    {
      stat: '6',
      title: 'Years in the community',
      description: 'Proudly serving our neighbourhood since 2018, rain or shine.'
    },
    {
      stat: '3am',
      title: 'Baker start time',
      description: 'Our bakers clock in before sunrise so your morning loaf is perfect.'
    }
  ];
}
