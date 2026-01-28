import { KeyOf }        from '@itrocks/class-type'
import { ObjectOrType } from '@itrocks/class-type'
import { decorate }     from '@itrocks/decorator/property'
import { decoratorOf }  from '@itrocks/decorator/property'

const EMAIL_ADDRESS = Symbol('email-address')

export function EmailAddress<T extends object>(value = true)
{
	return decorate<T>(EMAIL_ADDRESS, value)
}

export function emailAddressOf<T extends object>(target: ObjectOrType<T>, property: KeyOf<T>)
{
	return decoratorOf(target, property, EMAIL_ADDRESS, false)
}
