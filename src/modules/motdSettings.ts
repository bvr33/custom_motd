import { CustomForm, FormButton, FormInput, FormLabel, FormSlider, FormToggle, SimpleForm } from "bdsx/bds/form"
import { ServerPlayer } from "bdsx/bds/player"
import { TextFormat } from "bdsx/util"
import { plugin } from ".."
import { motdLoop } from "./motdLoop"

export const motdSettings = ( commandUser: ServerPlayer ) => {
    const f = new SimpleForm( 'Motd Settings' )
    f.addButton( new FormButton( 'Add Message' ) )
    f.addButton( new FormButton( 'Delete Message' ) )
    f.addButton( new FormButton( 'Settings' ) )

    f.sendTo( commandUser.getNetworkIdentifier(),
        ( { response } ) => {
            switch( response ) {
                case 0:
                    addMotd( commandUser )
                    break
                case 1:
                    delMotd( commandUser )
                    break
                case 2:
                    settings( commandUser )
                    break
            }
        }
    )
}

const addMotd = ( commandUser: ServerPlayer ) => {
    const f = new CustomForm( 'Add MOTD' )
    f.addComponent( new FormInput( 'add MOTD', 'MOTD', '' ) )
    f.sendTo( commandUser.getNetworkIdentifier(),
        ( { response } ) => {
            if( response[0] != '' ) {
                plugin.config.values.push( response[0] )
                plugin.updateConfig()
                motdLoop.updateMessage()
            }
            motdSettings( commandUser )
        }
    )
}
const delMotd = ( commandUser: ServerPlayer ) => {
    const f = new CustomForm( `Delete MOTD` )
    plugin.config.values.forEach(
        ( value: string, idx: number ) => {
            f.addComponent( new FormLabel( value ) )
            f.addComponent( new FormToggle( 'Remove', false ) )
            f.addComponent( new FormLabel( `${TextFormat.WHITE}--------------` ) )
        }
    )


    f.sendTo( commandUser.getNetworkIdentifier(),
        ( { response } ) => {
            const filteredResponse: boolean[] = response.filter( ( value: boolean | null ) => value != null )
            filteredResponse.forEach( ( v, i ) => {
                if( v ) plugin.config.values.splice( i, 1 )
            } )
            plugin.updateConfig()
            motdLoop.updateMessage()
            motdSettings( commandUser )
        }
    )
}
const settings = ( commandUser: ServerPlayer ) => {
    const f = new CustomForm( 'MOTD Settings' )
    f.addComponent( new FormToggle( 'Enable', plugin.config.enabled ) )
    f.addComponent( ( new FormSlider( "interval (seconds)", 1, 100, 1, plugin.config.interval ) ) )

    f.sendTo( commandUser.getNetworkIdentifier(),
        ( { response } ) => {
            plugin.config.enabled = response[0]
            plugin.config.interval = response[1]
            plugin.updateConfig()
            motdSettings( commandUser )
        }
    )
}