/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BaseClass } from './base';
import { type RequesterResponseInterface } from './requester';

export interface TwoStepVerificationObject {
	pin: string;
}

export interface SetPinResponseObject {
	success: boolean;
}

export declare class TwoStepVerificationClass extends BaseClass {
  setPin(
		pin: number,
	): Promise<RequesterResponseInterface<SetPinResponseObject>>;
}
