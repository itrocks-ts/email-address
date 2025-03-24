import { KeyOf, ObjectOrType }   from '@itrocks/class-type'
import { decorate, decoratorOf } from '@itrocks/decorator/property'

const EMAIL_ADDRESS = Symbol('email')

export function EmailAddress<T extends object>(value = true)
{
	return decorate<T>(EMAIL_ADDRESS, value)
}

export function emailAddressOf<T extends object>(target: ObjectOrType<T>, property: KeyOf<T>)
{
	return decoratorOf(target, property, EMAIL_ADDRESS, false)
}
