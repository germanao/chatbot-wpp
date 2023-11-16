/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BaseClass } from './base';
import {
  type MessageTypesEnum,
  type ComponentTypesEnum,
  type LanguagesEnum,
  type ParametersTypesEnum,
  type CurrencyCodesEnum,
  type ButtonTypesEnum,
  type ButtonPositionEnum,
  type InteractiveTypesEnum,
} from './enums';
import { type GeneralRequestBody, type RequesterResponseInterface } from './requester';

export type GeneralMessageBody = GeneralRequestBody & {
	/**
	 * The Meta messaging product name.
	 * @default 'whatsapp'
	 */
	messaging_product: 'whatsapp';
};

export interface StatusObject {
	status: 'read';
	message_id: string;
}

export type StatusRequestBody = GeneralMessageBody & StatusObject;

interface ConTextObject {
	message_id: string;
}

export type MessageRequestBody<T extends MessageTypesEnum> =
	GeneralMessageBody & {
		recipient_type?: string;
		to: string;
		context?: ConTextObject;
		type?: T;
	};

interface MetaAudioMediaObject {
	id: string;
	link?: never;
}

interface HostedAudioMediaObject {
	id?: never;
	link: string;
}

export type AudioMediaObject = MetaAudioMediaObject | HostedAudioMediaObject;

export type AudioMessageRequestBody =
	MessageRequestBody<MessageTypesEnum.Audio> & {
		[MessageTypesEnum.Audio]: [AudioMediaObject];
	};

interface AddressesObject {
	street?: string;
	city?: string;
	state?: string;
	zip?: string;
	country?: string;
	country_code?: string;
	type?: 'HOME' | 'WORK' | string;
}

interface EmailObject {
	email?: string;
	type?: 'HOME' | 'WORK' | string;
}

interface NameObject {
	formatted_name: string;
	first_name?: string;
	last_name?: string;
	middle_name?: string;
	suffix?: string;
	prefix?: string;
}

interface OrgObject {
	company?: string;
	department?: string;
	title?: string;
}

interface PhoneObject {
	phone?: 'PHONE_NUMBER';
	type?: 'CELL' | 'MAIN' | 'IPHONE' | 'HOME' | 'WORK' | string;
	wa_id?: string;
}

interface URLObject {
	url?: string;
	type?: 'HOME' | 'WORK' | string;
}

export interface ContactObject {
	addresses?: AddressesObject[];
	birthday?: `${number}${number}${number}${number}-${number}${number}-${number}${number}`;
	emails?: EmailObject[];
	name: NameObject;
	org?: OrgObject;
	phones?: PhoneObject[];
	urls?: URLObject[];
}

export type ContactsMessageRequestBody =
	MessageRequestBody<MessageTypesEnum.Contacts> & {
		[MessageTypesEnum.Contacts]: [ContactObject];
	};

interface MetaDocumentMediaObject {
	id: string;
	link?: never;
	caption?: string;
	filename?: string;
}

interface HostedDocumentMediaObject {
	id?: never;
	link: string;
	caption?: string;
	filename?: string;
}

export type DocumentMediaObject =
	| MetaDocumentMediaObject
	| HostedDocumentMediaObject;

export type DocumentMessageRequestBody =
	MessageRequestBody<MessageTypesEnum.Document> & {
		[MessageTypesEnum.Document]: [DocumentMediaObject];
	};

interface MetaImageMediaObject {
	id: string;
	link?: never;
	caption?: string;
}

interface HostedImageMediaObject {
	id?: never;
	link: string;
	caption?: string;
}

export type ImageMediaObject = MetaImageMediaObject | HostedImageMediaObject;

export type ImageMessageRequestBody =
	MessageRequestBody<MessageTypesEnum.Image> & {
		[MessageTypesEnum.Image]: [ImageMediaObject];
	};

interface ProductObject {
	product_retailer_id: string;
}

interface SimpleTextObject {
	text: string;
}

interface RowObject {
	id: string;
	title: string;
	description?: string;
}

interface MultiProductSectionObject {
	product_items: ProductObject[];
	rows?: never;
	title?: string;
}

interface ListSectionObject {
	product_items?: never;
	rows: RowObject[];
	title?: string;
}

type SectionObject = MultiProductSectionObject | ListSectionObject;

interface ButtonObject {
	title: string;
	id: string;
}

interface ReplyButtonObject {
	type: 'reply';
	reply: ButtonObject;
}

interface ActionObject {
	button?: string;
	buttons?: ReplyButtonObject[];
	catalog_id?: string;
	product_retailer_id?: string;
	sections?: SectionObject;
}

interface HeaderObject {
	type: 'document' | 'image' | 'text' | 'video';
	document?: DocumentMediaObject;
	image?: ImageMediaObject;
	text?: string;
	video?: VideoMediaObject;
}

interface ButtonInteractiveObject {
	type: InteractiveTypesEnum.Button;
	body: SimpleTextObject;
	footer?: SimpleTextObject;
	header?: HeaderObject;
	action: ActionObject;
}

interface ListInteractiveObject {
	type: InteractiveTypesEnum.List;
	body: SimpleTextObject;
	footer?: SimpleTextObject;
	header?: HeaderObject;
	action: ActionObject;
}

interface ProductInteractiveObject {
	type: InteractiveTypesEnum.Product;
	body?: SimpleTextObject;
	footer?: SimpleTextObject;
	header?: HeaderObject;
	action: ActionObject;
}

interface ProductListInteractiveObject {
	type: InteractiveTypesEnum.ProductList;
	body: SimpleTextObject;
	footer?: SimpleTextObject;
	header: HeaderObject;
	action: ActionObject;
}

export type InteractiveObject =
	| ButtonInteractiveObject
	| ListInteractiveObject
	| ProductInteractiveObject
	| ProductListInteractiveObject;

export type InteractiveMessageRequestBody =
	MessageRequestBody<MessageTypesEnum.Interactive> & {
		[MessageTypesEnum.Interactive]: InteractiveObject;
	};

interface MetaStickerMediaObject {
	id: string;
	link?: never;
}

interface HostedStickerMediaObject {
	id?: never;
	link: string;
}

export type StickerMediaObject =
	| MetaStickerMediaObject
	| HostedStickerMediaObject;

export type StickerMessageRequestBody =
	MessageRequestBody<MessageTypesEnum.Sticker> & {
		[MessageTypesEnum.Sticker]: [StickerMediaObject];
	};

interface ReActionObject {
	message_id: string;
	emoji: string;
}

export type ReactionMessageRequestBody =
	MessageRequestBody<MessageTypesEnum.Reaction> & ReActionObject;

export interface TextObject {
	body: string;
	preview_url?: boolean;
}

export type TextMessageRequestBody =
	MessageRequestBody<MessageTypesEnum.Text> & {
		[MessageTypesEnum.Text]: [TextObject];
	};

interface MetaHostedVideoMediaObject {
	id: string;
	link?: never;
	caption?: string;
}

interface SelfHostedVideoMediaObject {
	id?: never;
	link: string;
	caption?: string;
}

export type VideoMediaObject =
	| MetaHostedVideoMediaObject
	| SelfHostedVideoMediaObject;

export type VideoMessageRequestBody =
	MessageRequestBody<MessageTypesEnum.Video> & {
		[MessageTypesEnum.Video]: [VideoMediaObject];
	};

interface LanguageObject {
	policy: 'deterministic';
	code: LanguagesEnum;
}

interface ParametersObject<T extends ParametersTypesEnum> {
	type: T;
}

type TextParametersObject = ParametersObject<ParametersTypesEnum.Text> &
	SimpleTextObject;

interface CurrencyObject {
	fallback_value: string;
	code: CurrencyCodesEnum;
	amount_1000: number;
}

type CurrencyParametersObject =
	ParametersObject<ParametersTypesEnum.Currency> & {
		currency: CurrencyObject;
	};

interface DateTimeObject {
	fallback_value: string;
}

type DateTimeParametersObject =
	ParametersObject<ParametersTypesEnum.Currency> & {
		date_time: DateTimeObject;
	};

type DocumentParametersObject = ParametersObject<ParametersTypesEnum.Document> &
	DocumentMediaObject;

type ImageParametersObject = ParametersObject<ParametersTypesEnum.Image> &
	ImageMediaObject;

type VideoParametersObject = ParametersObject<ParametersTypesEnum.Video> &
	VideoMediaObject;

interface QuickReplyButtonParametersObject {
	type: ParametersTypesEnum.Payload;
	payload: string;
}

type URLButtonParametersObject = SimpleTextObject & {
	type: ParametersTypesEnum.Text;
};

type ButtonParameterObject =
	| QuickReplyButtonParametersObject
	| URLButtonParametersObject;

interface ComponentObject<T extends ComponentTypesEnum> {
	type: T;
	parameters: Array<| CurrencyParametersObject
		| DateTimeParametersObject
		| DocumentParametersObject
		| ImageParametersObject
		| TextParametersObject
		| VideoParametersObject>;
}

type ButtonComponentObject = ComponentObject<ComponentTypesEnum.Button> & {
	parameters: ButtonParameterObject;
	sub_type: ButtonTypesEnum;
	index: ButtonPositionEnum;
};

export interface MessageTemplateObject<T extends ComponentTypesEnum> {
	name: string;
	language: LanguageObject;
	components?: Array<ComponentObject<T> | ButtonComponentObject>;
}

export type MessageTemplateRequestBody<T extends ComponentTypesEnum> =
	MessageRequestBody<MessageTypesEnum.Template> & MessageTemplateObject<T>;

export interface LocationObject {
	longitude: number;
	latitude: number;
	name?: string;
	address?: string;
}

export type LocationMessageRequestBody =
	MessageRequestBody<MessageTypesEnum.Location> & {
		[MessageTypesEnum.Location]: [LocationObject];
	};

export type MessagesResponse = GeneralMessageBody & {
	contacts: [
		{
			input: string;
			wa_id: string;
		},
	];
	messages: [
		{
			id: string;
		},
	];
};

export declare class MessagesClass extends BaseClass {
  audio(
		body: AudioMediaObject,
		recipient: number,
		replyMessageId?: string,
	): Promise<RequesterResponseInterface<MessagesResponse>>;
  contacts(
		body: [ContactObject],
		recipient: number,
		replyMessageId?: string,
	): Promise<RequesterResponseInterface<MessagesResponse>>;
  document(
		body: DocumentMediaObject,
		recipient: number,
		replyMessageId?: string,
	): Promise<RequesterResponseInterface<MessagesResponse>>;
  image(
		body: ImageMediaObject,
		recipient: number,
		replyMessageId?: string,
	): Promise<RequesterResponseInterface<MessagesResponse>>;
  interactive(
		body: InteractiveObject,
		recipient: number,
		replyMessageId?: string,
	): Promise<RequesterResponseInterface<MessagesResponse>>;
  location(
		body: LocationObject,
		recipient: number,
		replyMessageId?: string,
	): Promise<RequesterResponseInterface<MessagesResponse>>;
  status(
		body: StatusObject,
	): Promise<RequesterResponseInterface<MessagesResponse>>;
  sticker(
		body: StickerMediaObject,
		recipient: number,
		replyMessageId?: string,
	): Promise<RequesterResponseInterface<MessagesResponse>>;
  template(
		body: MessageTemplateObject<ComponentTypesEnum>,
		recipient: number,
		replyMessageId?: string,
	): Promise<RequesterResponseInterface<MessagesResponse>>;
  text(
		body: TextObject,
		recipient: number,
		replyMessageId?: string,
	): Promise<RequesterResponseInterface<MessagesResponse>>;
  video(
		body: VideoMediaObject,
		recipient: number,
		replyMessageId?: string,
	): Promise<RequesterResponseInterface<MessagesResponse>>;
}
