/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { type ServerResponse , type IncomingHttpHeaders } from 'http';
import { type WAConfigType } from './config';
import {
  type ConversationTypesEnum,
  type CurrencyCodesEnum,
  type StatusEnum,
  type VideoMediaTypesEnum,
  type ReferralSourceTypesEnum,
  type StickerMediaTypesEnum,
  type WebhookTypesEnum,
  type SystemChangeTypesEnum,
  type ImageMediaTypesEnum,
  type DocumentMediaTypesEnum,
} from './enums';
import { BaseClass } from './base';

interface PricingObject {
	category: ConversationTypesEnum;
	pricing_model: 'CBP';
}

interface OriginObject {
	type: ConversationTypesEnum;
}

interface ConversationObject {
	id: string;
	origin: OriginObject;
	expiration_timestamp: string;
}

interface ErrorDataObject {
	details: string;
}

interface ErrorObject {
	code: number;
	title: string;
	message: string;
	error_data: ErrorDataObject;
}

export interface StatusesObject {
	conversation: ConversationObject;
	errors: ErrorObject[];
	id: string;
	pricing: PricingObject;
	recipient_id: string;
	status: StatusEnum;
	timestamp: string;
}

interface AudioObject {
	id: string;
	mime_type: string;
}

interface ButtonObject {
	payload: string;
	text: string;
}

interface ConTextObject {
	forwarded: boolean;
	frequently_forwarded: boolean;
	from: string;
	id: string;
	referred_product: {
		catalog_id: string;
		product_retailer_id: string;
	};
}

interface DocumentObject {
	caption: string;
	filename: string;
	sha256: string;
	mime_type: DocumentMediaTypesEnum;
	id: string;
}

interface IdentityObject {
	acknowledged: string;
	created_timestamp: string;
	hash: string;
}

interface ImageObject {
	caption: string;
	sha256: string;
	id: string;
	mime_type: ImageMediaTypesEnum;
}

interface ButtonReplyObject {
	button_reply: {
		id: string;
		title: string;
	};
}

interface ListReplyObject {
	list_reply: {
		id: string;
		title: string;
		description: string;
	};
}

interface InteractiveObject {
	type: ButtonReplyObject | ListReplyObject;
}

interface ProductItemsObject {
	product_retailer_id: string;
	quantity: string;
	item_price: string;
	currency: CurrencyCodesEnum;
}

interface Order_Object {
	catalog_id: string;
	text: string;
	product_items: ProductItemsObject;
}

interface ReferralObject {
	source_url: URL;
	source_type: ReferralSourceTypesEnum;
	source_id: string;
	headline: string;
	body: string;
	media_type: ImageMediaTypesEnum | VideoMediaTypesEnum;
	image_url: URL;
	video_url: URL;
	thumbnail_url: URL;
}

interface StickerObject {
	mime_type: StickerMediaTypesEnum;
	sha256: string;
	id: string;
	animated: boolean;
}

interface SystemObject {
	body: string;
	identity: string;
	wa_id: string;
	type: SystemChangeTypesEnum;
	customer: string;
}

interface TextObject {
	body: string;
}

interface VideoObject {
	caption: string;
	filename: string;
	sha256: string;
	id: string;
	mime_type: VideoMediaTypesEnum;
}

export interface MessagesObject {
	audio?: AudioObject;
	button?: ButtonObject;
	context?: ConTextObject;
	document?: DocumentObject;
	errors: ErrorObject[];
	from: string;
	id: string;
	identity?: IdentityObject;
	image?: ImageObject;
	interactive?: InteractiveObject;
	order?: Order_Object;
	referral: ReferralObject;
	sticker?: StickerObject;
	system?: SystemObject;
	text?: TextObject;
	timestamp: string;
	type: WebhookTypesEnum;
	video?: VideoObject;
}

interface ProfileObject {
	name: string;
}

interface ContactObject {
	wa_id: string;
	profile: ProfileObject;
}

interface MetadataObject {
	display_phone_number: string;
	phoneNumberId: string;
	phone_number_id: string;
}

export interface ValueObject {
	messaging_product: 'whatsapp';
	contacts: ContactObject[];
	errors: ErrorObject[];
	messages: MessagesObject[];
	metadata: MetadataObject[];
	statuses: StatusesObject[];
}

interface ChangesObject {
	field: string;
	value: ValueObject;
}

interface Entry_Object {
	id: string;
	changes: ChangesObject[];
}

export interface WebhookObject {
	object: 'whatsapp_business_account';
	entry: Entry_Object[];
}

export interface WebhookSubscribeQuery {
	hub: {
		mode: 'subscribe';
		challenge: string;
		verify_token: string;
	};
}

export type WebhookCallback = (
	statusCode: number,
	headers: IncomingHttpHeaders,
	body?: WebhookObject,
	response?: ServerResponse,
	error?: Error,
) => any;

export declare class WebhooksClass extends BaseClass {
  constructor(config: WAConfigType, userAgent: string);
  start(cb: WebhookCallback): boolean;
  isStarted(): boolean;
  stop(cb: (err?: Error) => any): boolean;
}
