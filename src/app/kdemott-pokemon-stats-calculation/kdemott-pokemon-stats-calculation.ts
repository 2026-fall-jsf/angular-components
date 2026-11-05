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

    // Using Litten Base Stats

    protected readonly baseHp = 45;
    protected readonly hpIv = signal(0);
    protected readonly hpEv = signal(0);

    protected readonly baseAttack = 65;
    protected readonly attackIv = signal(0);
    protected readonly attackEv = signal(0);

    protected readonly baseDefense = 40;
    protected readonly defenseIv = signal(0);
    protected readonly defenseEv = signal(0);

    protected readonly baseSpecialAttack = 60;
    protected readonly specialAttackIv = signal(0);
    protected readonly specialAttackEv = signal(0);

    protected readonly baseSpecialDefense = 40;
    protected readonly specialDefenseIv = signal(0);
    protected readonly specialDefenseEv = signal(0);

    protected readonly baseSpeed = 70;
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
    protected readonly updateHpIv = (num: string) => this.hpIv.set(Number(num));
    protected readonly updateHpEv = (num: string) => this.hpEv.set(Number(num));

    protected readonly updateLevel = (num: string) => this.level.set(Number(num));

    // protected readonly updateNature = (nature: string) => this.nature.set(Number(nature));

    // Attack stat
    protected readonly updateAttackIv = (num: string) => this.attackIv.set(Number(num));
    protected readonly updateAttackEv = (num: string) => this.attackEv.set(Number(num));

    // Defense stat
    protected readonly updateDefenseIv = (num: string) => this.defenseIv.set(Number(num));
    protected readonly updateDefenseEv = (num: string) => this.defenseEv.set(Number(num));

    // Special Attack stat
    protected readonly updateSpecialAttackIv = (num: string) => this.specialAttackIv.set(Number(num));
    protected readonly updateSpecialAttackEv = (num: string) => this.specialAttackEv.set(Number(num));

    // Special Defense stat
    protected readonly updateSpecialDefenseIv = (num: string) => this.specialDefenseIv.set(Number(num));
    protected readonly updateSpecialDefenseEv = (num: string) => this.specialDefenseEv.set(Number(num));

    // Speed stat
    protected readonly updateSpeedIv = (num: string) => this.speedIv.set(Number(num));
    protected readonly updateSpeedEv = (num: string) => this.speedEv.set(Number(num));

    // HP stat calculation
    protected readonly calculateHpStat = () => {
        this.quotient.set(Math.floor(this.hpEv() / 4));

        this.productTwo.set(this.baseHp * 2);

        this.sum.set(this.productTwo() + this.hpIv());

        this.sumTwo.set(this.sum() + this.quotient());

        this.productTwo.set(this.sumTwo() * this.level());

        this.quotientTwo.set(Math.floor(this.productTwo() / 100));

        this.sumFour.set(this.quotientTwo() + this.level());

        this.sumFive.set(this.sumFour() + 10);

        this.finalHp.set(this.sumFive());
    }

    // Attack stat
    protected readonly calculateAttackStat = () => {
        this.quotient.set(Math.floor(this.hpEv() / 4));

        this.product.set(this.baseAttack * 2);

        this.sum.set(this.productTwo() + this.hpIv());

        this.sumTwo.set(this.sum() + this.quotient());

        this.productTwo.set(this.sumTwo() * this.level());

        this.quotientTwo.set(Math.floor(this.productTwo() / 100));

        this.sumFour.set(this.quotientTwo() + 5);

        this.productThree.set(this.sumFour() * 1.1);

        this.finalStatOther.set(this.sumFour()); // Temporary
    }

    // Defense stat
    protected readonly calculateDefenseStat = () => {
        this.quotient.set(Math.floor(this.hpEv() / 4));

        this.product.set(this.baseDefense * 2);

        this.sum.set(this.productTwo() + this.hpIv());

        this.sumTwo.set(this.sum() + this.quotient());

        this.productTwo.set(this.sumTwo() * this.level());

        this.quotientTwo.set(Math.floor(this.productTwo() / 100));

        this.sumFour.set(this.quotientTwo() + 5);

        this.productThree.set(this.sumFour() * 0.9);

        this.finalStatOther.set(this.sumFour()); // Temporary
    }

    // Special Attack stat
    protected readonly calculateSpecialAttack = () => {
        this.quotient.set(Math.floor(this.hpEv() / 4));

        this.product.set(this.baseSpecialAttack * 2);

        this.sum.set(this.productTwo() + this.hpIv());

        this.sumTwo.set(this.sum() + this.quotient());

        this.productTwo.set(this.sumTwo() * this.level());

        this.quotientTwo.set(Math.floor(this.productTwo() / 100));

        this.sumFour.set(this.quotientTwo() + 5);

        this.productThree.set(this.sumFour() * 1.0);

        this.finalStatOther.set(this.sumFour()); // Temporary
    }

    // Special Defense stat
    protected readonly calculateSpecialDefense = () => {
        this.quotient.set(Math.floor(this.hpEv() / 4));

        this.product.set(this.baseSpecialDefense * 2);

        this.sum.set(this.productTwo() + this.hpIv());

        this.sumTwo.set(this.sum() + this.quotient());

        this.productTwo.set(this.sumTwo() * this.level());

        this.quotientTwo.set(Math.floor(this.productTwo() / 100));

        this.sumFour.set(this.quotientTwo() + 5);

        this.productThree.set(this.sumFour() * 1.0);

        this.finalStatOther.set(this.sumFour()); // Temporary
    }

    // Speed stat
    protected readonly calculateSpeed = () => {
        this.quotient.set(Math.floor(this.hpEv() / 4));

        this.product.set(this.baseSpeed * 2);

        this.sum.set(this.productTwo() + this.hpIv());

        this.sumTwo.set(this.sum() + this.quotient());

        this.productTwo.set(this.sumTwo() * this.level());

        this.quotientTwo.set(Math.floor(this.productTwo() / 100));

        this.sumFour.set(this.quotientTwo() + 5);

        this.productThree.set(this.sumFour() * 1.0);

        this.finalStatOther.set(this.sumFour()); // Temporary
    }

    // HP=⌊(2*Base+IV+⌊EV/4⌋)*Level/100⌋+Level+10

    // OtherStat=⌊(⌊(2*Base+IV+⌊EV/4⌋)*Level/100⌋+5)*Nature⌋
}