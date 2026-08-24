export type Hero = { 
  id: string,
  name: string,
  location: string,
  power: number,
  status: 'available' | 'missing' | 'dead',
  motto: string
}

export type HeroFormVal = Omit<Hero, 'id'>