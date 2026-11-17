import { Component, signal } from "@angular/core";
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";

@Component({
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatFormField, MatLabel, MatInput, MatButton],
    selector: 'app-kdemott-pokemon-stats-calculation',
    styleUrl: './kdemott-pokemon-stats-calculation.css',
    templateUrl: './kdemott-pokemon-stats-calculation.html',
})

export class KdemottPokemonStatsCalculation {

    // Using Litten Base Stats

    protected readonly baseHp = 45;
    protected readonly hpIv = signal(0);
    protected readonly hpEv = 0;

    protected readonly baseAttack = 65;
    protected readonly attackIv = signal(0);
    protected readonly attackEv = 0;

    protected readonly baseDefense = 40;
    protected readonly defenseIv = signal(0);
    protected readonly defenseEv = 0;

    protected readonly baseSpecialAttack = 60;
    protected readonly specialAttackIv = signal(0);
    protected readonly specialAttackEv = 0;

    protected readonly baseSpecialDefense = 40;
    protected readonly specialDefenseIv = signal(0);
    protected readonly specialDefenseEv = 0;

    protected readonly baseSpeed = 70;
    protected readonly speedIv = signal(0);
    protected readonly speedEv = 0;

    protected readonly level = signal(1);

    protected readonly finalHp = signal(0);

    protected readonly finalStatAttack = signal(0);
    protected readonly finalStatDefense = signal(0);
    protected readonly finalStatSpecialAttack = signal(0);
    protected readonly finalStatSpecialDefense = signal(0);
    protected readonly finalStatSpeed = signal(0);

    // Level
    protected readonly updateLevel = (num: string) => this.level.set(Math.max(1, Math.min(100, Number(num))));

    // HP stat
    protected readonly updateHpIv = (num: string) => this.hpIv.set(Math.max(0, Math.min(31, Number(num))));

    // Attack stat
    protected readonly updateAttackIv = (num: string) => this.attackIv.set(Math.max(0, Math.min(31, Number(num))));

    // Defense stat
    protected readonly updateDefenseIv = (num: string) => this.defenseIv.set(Math.max(0, Math.min(31, Number(num))));

    // Special Attack stat
    protected readonly updateSpecialAttackIv = (num: string) => this.specialAttackIv.set(Math.max(0, Math.min(31, Number(num))));

    // Special Defense stat
    protected readonly updateSpecialDefenseIv = (num: string) => this.specialDefenseIv.set(Math.max(0, Math.min(31, Number(num))));

    // Speed stat
    protected readonly updateSpeedIv = (num: string) => this.speedIv.set(Math.max(0, Math.min(31, Number(num))));

    protected readonly updateFinalHp = (num: string) => this.finalHp.set(Number(num));

    protected readonly updateFinalStatAttack = (num: string) => this.finalStatAttack.set(Number(num));
    protected readonly updateFinalStatDefense = (num: string) => this.finalStatDefense.set(Number(num));
    protected readonly updateFinalStatSpecialAttack = (num: string) => this.finalStatSpecialAttack.set(Number(num));
    protected readonly updateFinalStatSpecialDefense = (num: string) => this.finalStatSpecialDefense.set(Number(num));
    protected readonly updateFinalStatSpeed = (num: string) => this.finalStatSpeed.set(Number(num));

    // HP stat calculation
    protected readonly calculateHpStat = () => {
        const quotient = Math.floor(this.hpEv / 4);

        const product = this.baseHp * 2;

        const sum = product + this.hpIv();

        const sumTwo = sum + quotient;

        const productThree = sumTwo * this.level();

        const quotientTwo = Math.floor(productThree / 100);

        const sumFour = quotientTwo + this.level();

        const sumFive = sumFour + 10;

        this.finalHp.set(sumFive);
    }

    // HP=⌊(2*Base+IV+⌊EV/4⌋)*Level/100⌋+Level+10

    // Attack stat calculation
    protected readonly calculateAttackStat = () => {
        const quotient = Math.floor(this.attackEv / 4);

        const product = this.baseAttack * 2;

        const sum = product + this.attackIv();

        const sumTwo = sum + quotient;

        const productTwo = sumTwo * this.level();

        const quotientTwo = Math.floor(productTwo / 100);

        const sumThree = quotientTwo + 5;

        const productThree = sumThree * 1.1;

        this.finalStatAttack.set(Math.floor(productThree)); // Temporary
    }

    // Defense stat calculation
    protected readonly calculateDefenseStat = () => {
        const quotient = Math.floor(this.defenseEv / 4);

        const product = this.baseDefense * 2;

        const sum = product + this.defenseIv();

        const sumTwo = sum + quotient;

        const productTwo = sumTwo * this.level();

        const quotientTwo = Math.floor(productTwo / 100);

        const sumThree = quotientTwo + 5;

        const productThree = sumThree * 0.9;

        this.finalStatDefense.set(Math.floor(productThree)); // Temporary
    }


    // // Special Attack stat calculation
    protected readonly calculateSpecialAttack = () => {
        const quotient = Math.floor(this.specialAttackEv / 4);

        const product = this.baseSpecialAttack * 2;

        const sum = product + this.specialAttackIv();

        const sumTwo = sum + quotient;

        const productTwo = sumTwo * this.level();

        const quotientTwo = (Math.floor(productTwo / 100));

        const sumFour = quotientTwo + 5;

        const productThree = sumFour * 1.0;

        this.finalStatSpecialAttack.set(Math.floor(productThree)); // Temporary
    }

    // OtherStat=⌊(⌊(2*Base+IV+⌊EV/4⌋)*Level/100⌋+5)*Nature⌋

    // // Special Defense stat calculation
    protected readonly calculateSpecialDefense = () => {
        const quotient = (Math.floor(this.specialDefenseEv / 4));

        const product = (this.baseSpecialDefense * 2);

        const sum = product + this.specialDefenseIv();

        const sumTwo = sum + quotient;

        const productTwo = sumTwo * this.level();

        const quotientTwo = (Math.floor(productTwo / 100));

        const sumFour = quotientTwo + 5;

        const productThree = sumFour * 1.0;

        this.finalStatSpecialDefense.set(Math.floor(productThree)); // Temporary
    }

    // // Speed stat calculation
    protected readonly calculateSpeed = () => {
        const quotient = (Math.floor(this.speedEv / 4));

        const product = this.baseSpeed * 2;

        const sum = product + this.speedIv();

        const sumTwo = sum + quotient;

        const productTwo = sumTwo * this.level();

        const quotientTwo = (Math.floor(productTwo / 100));

        const sumFour = quotientTwo + 5;

        const productThree = sumFour * 1.0;

        this.finalStatSpeed.set(Math.floor(productThree)); // Temporary
    }

    protected readonly calculateStats = () => {
        this.calculateHpStat();
        this.calculateAttackStat();
        this.calculateDefenseStat();
        this.calculateSpecialAttack();
        this.calculateSpecialDefense();
        this.calculateSpeed();
    }

    // HP=⌊(2*Base+IV+⌊EV/4⌋)*Level/100⌋+Level+10

    // OtherStat=⌊(⌊(2*Base+IV+⌊EV/4⌋)*Level/100⌋+5)*Nature⌋
}