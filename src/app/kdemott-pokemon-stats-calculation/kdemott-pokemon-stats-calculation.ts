import { Component, signal } from "@angular/core";
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";

@Component({
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatFormField, MatLabel, MatInput],
  selector: 'app-kdemott-pokemon-stats-calculation',
  styleUrl: './kdemott-pokemon-stats-calculation.css',
  templateUrl: './kdemott-pokemon-stats-calculation.html',
})

export class KdemottPokemonStatsCalculation {
  protected readonly baseHp = signal(0);
  protected readonly hpIv = signal(0);
  protected readonly hpEv = signal(0);

  protected readonly baseAttack = signal(0);
  protected readonly attackIv = signal(0);
  protected readonly attackEv = signal(0);

  protected readonly baseDefense = signal(0);
  protected readonly defenseIv = signal(0);
  protected readonly defenseEv = signal(0);

  protected readonly baseSpecialAttack = signal(0);
  protected readonly specialAttackIv = signal(0);
  protected readonly specialAttackEv = signal(0);

  protected readonly baseSpecialDefense = signal(0);
  protected readonly specialDefenseIv = signal(0);
  protected readonly specialDefenseEv = signal(0);

  protected readonly baseSpeed = signal(0);
  protected readonly speedIv = signal(0);
  protected readonly speedEv = signal(0);

  protected readonly level = signal(0);

  protected readonly sum = signal(0);
  protected readonly product = signal(0);
  protected readonly quotient = signal(0);
  protected readonly productTwo = signal(0);
  protected readonly sumTwo = signal(0);
  protected readonly sumThree = signal(0);
  protected readonly quotientTwo = signal(0);
  protected readonly sumFour = signal(0);
  protected readonly sumFive = signal(0);
  protected readonly productThree = signal(0);

  protected readonly finalHp = signal(0);

  protected readonly finalStatOther = signal(0);

  // HP stat
  protected readonly updateBaseHp = (num: string) => this.baseHp.set(Number(num));
  protected readonly updateHpIv = (num: string) => this.hpIv.set(Number(num));
  protected readonly updateHpEv = (num: string) => this.hpEv.set(Number(num));
  
  protected readonly updateLevel = (num: string) => this.level.set(Number(num));

  // protected readonly updateNature = (nature: string) => this.nature.set(Number(nature));

  // For other stats
  protected readonly updateBaseAttack = (num: string) => this.baseAttack.set(Number(num));
  protected readonly updateAttackIv = (num: string) => this.attackIv.set(Number(num));
  protected readonly updateAttackEv = (num: string) => this.attackEv.set(Number(num));

  protected readonly updateBaseDefense = (num: string) => this.baseDefense.set(Number(num));
  protected readonly updateDefenseIv = (num: string) => this.defenseIv.set(Number(num));
  protected readonly updateDefenseEv = (num: string) => this.defenseEv.set(Number(num));

  protected readonly updateBaseSpecialAttack = (num: string) => this.baseSpecialAttack.set(Number(num));
  protected readonly updateSpecialAttackIv = (num: string) => this.specialAttackIv.set(Number(num));
  protected readonly updateSpecialAttackEv = (num: string) => this.specialAttackEv.set(Number(num));

  protected readonly updateBaseSpecialDefense = (num: string) => this.baseSpecialDefense.set(Number(num));
  protected readonly updateSpecialDefenseIv = (num: string) => this.specialDefenseIv.set(Number(num));
  protected readonly updateSpecialDefenseEv = (num: string) => this.specialDefenseEv.set(Number(num));

  protected readonly updateBaseSpeed = (num: string) => this.baseSpeed.set(Number(num));
  protected readonly updateSpeedIv = (num: string) => this.speedIv.set(Number(num));
  protected readonly updateSpeedEv = (num: string) => this.speedEv.set(Number(num));

  protected readonly calculateHpStat = () => {
      this.quotient.set(Math.floor(this.hpEv() / 4));

      this.productTwo.set(this.baseHp() * 2);

      this.sum.set(this.productTwo() + this.hpIv());

      this.sumTwo.set(this.sum() + this.quotient());

      this.productTwo.set(this.sumTwo() * this.level());

      this.quotientTwo.set(Math.floor(this.productTwo() / 100));

      this.sumFour.set(this.quotientTwo() + this.level());

      this.sumFive.set(this.sumFour() + 10);

      this.finalHp.set(this.sumFive());
  }

  protected readonly calculateOtherStats = () => {
      this.quotient.set(Math.floor(this.hpEv() / 4));

      this.product.set(this.baseHp() * 2);

      this.sum.set(this.productTwo() + this.hpIv());

      this.sumTwo.set(this.sum() + this.quotient());

      this.productTwo.set(this.sumTwo() * this.level());

      this.quotientTwo.set(Math.floor(this.productTwo() / 100));

      this.sumFour.set(this.quotientTwo() + 5);
      
      // this.productThree.set(this.sumFour() * increaseMultiplier); // Nature

      this.finalStatOther.set(this.sumFour()); // Temporary
  }

  // HP=⌊(2*Base+IV+⌊EV/4⌋)*Level/100⌋+Level+10

  // OtherStat=⌊(⌊(2*Base+IV+⌊EV/4⌋)*Level/100⌋+5)*Nature⌋
}

type Nature = {
  name: string,
  increasedStat: string,
  decreasedStat: string,
};

type pokemonBaseStats = {
  name: string,
  hp: number,
  attack: number,
  defense: number,
  specialAttack: number,
  specialDefense: number,
  speed: number,
}

const increaseMultiplier = 1.1;
const decreaseMultiplier = 0.9;

const stat = {
  Attack: "Attack",
  Defense: "Defense",
  specialAttack: "Special Attack",
  specialDefense: "Special Defense",
  Speed: "Speed",
}

const natures: Nature[] = [
    {
        name: "Hardy",
        increasedStat: "Attack",
        decreasedStat: "Attack",
    },
    {
        name: "Lonely",
        increasedStat: "Attack",
        decreasedStat: "Defense",
    },
    {
        name: "Adamant",
        increasedStat: "Attack",
        decreasedStat: "Special Attack",
    },
    {
        name: "Naughty",
        increasedStat: "Attack",
        decreasedStat: "Special Defense",
    },
    {
        name: "Brave",
        increasedStat: "Attack",
        decreasedStat: "Speed",
    },
    {
        name: "Bold",
        increasedStat: "Defense",
        decreasedStat: "Attack",
    },
    {
        name: "Docile",
        increasedStat: "Defense",
        decreasedStat: "Defense",
    },
    {
        name: "Impish",
        increasedStat: "Defense",
        decreasedStat: "Special Attack",
    },
    {
        name: "Lax",
        increasedStat: "Defense",
        decreasedStat: "Special Defense",
    },
    {
        name: "Relaxed",
        increasedStat: "Defense",
        decreasedStat: "Speed",
    },
    {
        name: "Modest",
        increasedStat: "Special Attack",
        decreasedStat: "Attack",
    },
    {
        name: "Mild",
        increasedStat: "Special Attack",
        decreasedStat: "Defense",
    },
    {
        name: "Bashful",
        increasedStat: "Special Attack",
        decreasedStat: "Special Attack",
    },
    {
        name: "Rash",
        increasedStat: "Special Attack",
        decreasedStat: "Special Defense",
    },
    {
        name: "Quiet",
        increasedStat: "Special Attack",
        decreasedStat: "Speed",
    },
    {
        name: "Calm",
        increasedStat: "Special Defense",
        decreasedStat: "Attack",
    },
    {
        name: "Gentle",
        increasedStat: "Special Defense",
        decreasedStat: "Defense",
    },
    {
        name: "Careful",
        increasedStat: "Special Defense",
        decreasedStat: "Special Attack",
    },
    {
        name: "Quirky",
        increasedStat: "Special Defense",
        decreasedStat: "Special Defense",
    },
    {
        name: "Sassy",
        increasedStat: "Special Defense",
        decreasedStat: "Speed",
    },
    {
        name: "Timid",
        increasedStat: "Speed",
        decreasedStat: "Attack",
    },
    {
        name: "Hasty",
        increasedStat: "Speed",
        decreasedStat: "Defense",
    },
    {
        name: "Jolly",
        increasedStat: "Speed",
        decreasedStat: "Special Attack",
    },
    {
        name: "Naive",
        increasedStat: "Speed",
        decreasedStat: "Special Defense",
    },
    {
      name: "Serious",
      increasedStat: "Speed",
      decreasedStat: "Speed",
    }
];