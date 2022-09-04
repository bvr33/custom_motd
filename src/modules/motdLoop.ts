import { events } from "bdsx/event"
import { bedrockServer } from "bdsx/launcher"
import { serverProperties } from "bdsx/serverproperties"
import { plugin } from ".."

export namespace motdLoop {

    let loop: NodeJS.Timeout
    let messageIndex: number = 0
    let messagesCount: number

    export function start(): void {
        if( plugin.config.values.length == 0 ) plugin.config.values.push( 'SERVER NAME' )
        if( plugin.config.enabled ) {
            updateMessage()
            loop = setInterval(
                () => {
                    let motdValue: string
                    if( messagesCount > 1 ) {
                        if( messageIndex >= messagesCount ) messageIndex = 0
                        else messageIndex++
                    } else messageIndex = 0

                    motdValue = plugin.config.values[messageIndex]

                    if( plugin.config.enabled ) {
                        bedrockServer.serverInstance.setMotd( serverProperties["server-name"]! )
                        stop()
                        return
                    }
                    bedrockServer.serverInstance.setMotd( motdValue )
                    plugin.log( 'work!!!' )
                },
                1000 * plugin.config.interval
            )
        }
    }

    export function stop(): void {
        clearInterval( loop )
    }

    export function updateMessage(): void {
        plugin.updateConfig()
        messagesCount = plugin.config.values.length - 1
    }

}