import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
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
      iconPath: 'M12 2a10 10 0 1 1 0 20A10 10 0 0 1 12 2zm0 6v6l4 2'
    },
    {
      title: 'Community First',
      desc: 'We donate surplus bread daily to the local shelter and food bank.',
      iconPath: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10'
    }
  ];

  readonly milestones = [
    {
      year: '2018',
      title: 'Nordic Crumb Opens Its Doors',
      desc: 'Astrid and Erik converted a former ironmonger\'s workshop into a 24-seat bakery. On opening day, every loaf sold out before 9 am.'
    },
    {
      year: '2019',
      title: 'The Wood-Fired Oven Arrives',
      desc: 'We imported a traditional stone-deck oven from Gothenburg. It took six weeks to install, but the crust it produces is incomparable.'
    },
    {
      year: '2020',
      title: 'Community Bread Programme',
      desc: 'During the hardest year, we launched our daily surplus donation. Over 4,000 loaves have since gone to neighbours who needed them most.'
    },
    {
      year: '2022',
      title: 'Lena Joins as Coffee Director',
      desc: 'Our single-origin coffee programme launched with three direct-trade relationships. The slow-drip bar quickly became a morning ritual for regulars.'
    },
    {
      year: '2024',
      title: 'Nordic Crumb Online Shop',
      desc: 'We opened pre-orders for weekly bread boxes, bringing slow fermentation to tables beyond our neighbourhood for the first time.'
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
      description: 'We never rush the process. Slow fermentation is our non-negotiable.',
      iconPath: 'M16 16l4 4M8 8l4-4M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18zm0-6V12l3 2'
    },
    {
      stat: '100%',
      title: 'Organic ingredients',
      description: 'From flour to finishing salt — certified organic, every time.',
      iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14l-4-4 1.41-1.41L10 13.17l6.59-6.59L18 8l-8 8z'
    },
    {
      stat: '6',
      title: 'Years in community',
      description: 'Proudly serving our neighbourhood since 2018, rain or shine.',
      iconPath: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10'
    },
    {
      stat: '3am',
      title: 'Baker start time',
      description: 'Our bakers clock in before sunrise so your morning loaf is perfect.',
      iconPath: 'M12 2a10 10 0 1 1 0 20A10 10 0 0 1 12 2zm0 6v6l4 2'
    }
  ];
}
