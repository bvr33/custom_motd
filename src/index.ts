
import { events } from "bdsx/event"
import { TextFormat } from "bdsx/util"
import { Plugin } from './utils/plugin'
import './commands'
import './modules/motdLoop'

export enum langs {
    PL = "PL_pl"
}

export interface Language {
}
export interface Configuration {
    language: langs,
    interval: number,
    enabled: boolean,
    values: string[],
}

export const plugin = new Plugin(
    'Custom MOTD',
    {
        language: langs.PL,
        interval: 10,
        enabled: true,
        values: [
            `${TextFormat.YELLOW}SERVER NAME`,
            `${TextFormat.RED}SERVER NAME`,
            `${TextFormat.BLUE}SERVER NAME`
        ]
    },
    {}
)

events.serverOpen.on(
    () => {
        plugin.log( `launching` )
    }
)

events.serverClose.on(
    () => {
        plugin.log( `closed` )
    }
);

