
import { events } from "bdsx/event"
import { command } from 'bdsx/command'
import { CommandPermissionLevel } from "bdsx/bds/command"
import { ServerPlayer } from 'bdsx/bds/player'
import { motdSettings } from './modules/motdSettings'

events.serverOpen.on(
    async () => {

        const cmd = command.register( 'motd', 'motd settings form', CommandPermissionLevel.Operator )

        cmd.overload(
            async ( _param, origin, _output ) => {
                if( origin.isServerCommandOrigin() ) return console.log( 'This command can only be executed by players'.red )
                const commandUser = <ServerPlayer> origin.getEntity()
                motdSettings( commandUser )
            },
            {}
        )
    }
)