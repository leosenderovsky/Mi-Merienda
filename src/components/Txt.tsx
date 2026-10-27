/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

type TxtProps<T extends React.ElementType> = {
  as?: T;
  value?: string | null;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'value' | 'children'>;

/**
 * Muestra un texto editable de brand.json y NO dibuja nada si está vacío:
 * así un cliente puede quitar un texto (p. ej. un aviso legal) dejándolo en blanco.
 */
export function Txt<T extends React.ElementType = 'span'>({ as, value, ...rest }: TxtProps<T>) {
  if (value == null || String(value).trim() === '') return null;
  const Tag = (as ?? 'span') as React.ElementType;
  return <Tag {...rest}>{value}</Tag>;
}
