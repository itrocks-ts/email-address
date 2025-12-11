[![npm version](https://img.shields.io/npm/v/@itrocks/email-address?logo=npm)](https://www.npmjs.org/package/@itrocks/email-address)
[![npm downloads](https://img.shields.io/npm/dm/@itrocks/email-address)](https://www.npmjs.org/package/@itrocks/email-address)
[![GitHub](https://img.shields.io/github/last-commit/itrocks-ts/email-address?color=2dba4e&label=commit&logo=github)](https://github.com/itrocks-ts/email-address)
[![issues](https://img.shields.io/github/issues/itrocks-ts/email-address)](https://github.com/itrocks-ts/email-address/issues)
[![discord](https://img.shields.io/discord/1314141024020467782?color=7289da&label=discord&logo=discord&logoColor=white)](https://25.re/ditr)

# email-address

An @EmailAddress() decorator to validate that a property contains a valid email address.

*This documentation was written by an artificial intelligence and may contain errors or approximations.
It has not yet been fully reviewed by a human. If anything seems unclear or incomplete,
please feel free to contact the author of this package.*

## Installation

```bash
npm i @itrocks/email-address
```

## Usage

`@itrocks/email-address` provides a property decorator `@EmailAddress()`
that lets you mark a field as expected to contain a valid email address.
The decorator does not perform the validation itself: it adds metadata
that other parts of the framework (or your own code) can use to check
and enforce the value.

You can also read this metadata using the helper function
`emailAddressOf`, for example to build your own validation pipeline or
form‑rendering logic.

### Minimal example

```ts
import { EmailAddress } from '@itrocks/email-address'

class User {
  @EmailAddress()
  email = ''
}
```

Here, the `email` property is marked as containing an email address.
A generic validator can then iterate over the properties decorated with
`@EmailAddress()` to verify that they match the expected format.

### Complete example with decorator lookup

In a typical use case, you combine this package with other components
that rely on decorators to generate forms or validate data.

```ts
import type { ObjectOrType }   from '@itrocks/class-type'
import { EmailAddress, emailAddressOf } from '@itrocks/email-address'

class User {
  @EmailAddress()
  email = ''

  // This property will not be considered an email address
  name  = ''
}

function listEmailFields<T extends object>(type: ObjectOrType<T>): (keyof T)[] {
  const result: (keyof T)[] = []

  // Simplified example: iterate over known properties
  for (const property of ['email', 'name'] as (keyof T)[]) {
    if (emailAddressOf(type, property)) {
      result.push(property)
    }
  }

  return result
}

// Result: ['email']
const emailFields = listEmailFields(User)
```

In practice, you will usually rely on helpers provided by other
`@itrocks/*` packages to navigate decorator metadata, instead of
manually listing properties as in this example.

## API

### `function EmailAddress<T extends object>(value?: boolean): DecorateCaller<T>`

Property decorator indicating that a field is expected to contain a
valid email address.

#### Parameters

- `value` *(optional, default: `true`)* – enables or disables the
  marking of the property as an email address. In most cases you will
  simply use `@EmailAddress()`. Passing `false` lets you remove or
  ignore this marker in advanced scenarios.

#### Return value

- `DecorateCaller<T>` – function from `@itrocks/decorator/property`
  used internally by TypeScript to apply the decorator on the target
  property. You normally do not need to call it directly; you just apply
  `@EmailAddress()` to the property.

#### Example

```ts
class ContactForm {
  @EmailAddress()
  replyTo = ''
}
```

---

### `function emailAddressOf<T extends object>(target: ObjectOrType<T>, property: KeyOf<T>): boolean`

Checks whether a given property is decorated with `@EmailAddress()`.

#### Parameters

- `target` – the class (`User`) or instance (`new User()`) that owns the
  property to check.
- `property` – the name of the property to inspect.

#### Return value

- `boolean` – `true` if the property is currently marked as an email
  address, `false` otherwise.

#### Example

```ts
import type { ObjectOrType } from '@itrocks/class-type'
import { EmailAddress, emailAddressOf } from '@itrocks/email-address'

class User {
  @EmailAddress()
  email = ''

  name = ''
}

function isEmailProperty<T extends object>(type: ObjectOrType<T>, property: keyof T): boolean {
  return emailAddressOf(type, property)
}

isEmailProperty(User, 'email') // true
isEmailProperty(User, 'name')  // false
```

## Typical use cases

- Mark properties in your domain models that must contain an email
  address, so that a generic validator can verify them.
- Automatically generate email‑type form fields based on decorator
  metadata.
- Build a validation or rendering system that relies on decorators to
  infer the constraints associated with each property.
- Centralize the definition of what a “valid email address” is inside a
  single component of your application or framework, while keeping model
  annotations simple (`@EmailAddress()`).
