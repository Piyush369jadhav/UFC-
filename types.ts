
export enum Promotion {
    UFC = 'UFC',
    PFL = 'PFL',
    BKFC = 'BKFC',
    ONE = 'ONE Championship',
    BELLATOR = 'Bellator MMA',
    RIZIN = 'RIZIN FF',
}

export interface Matchup {
    fighter1: string;
    fighter2: string;
    weightClass: string;
    isMainEvent: boolean;
    isCoMainEvent: boolean;
}

export interface FightEvent {
    promotion: Promotion;
    eventName: string;
    date: string; // ISO 8601 format string
    venue: string;
    location: string;
    fightCard: Matchup[];
}

export interface Source {
    title: string;
    uri: string;
}
