import { DeepPartial, Field } from '@directus/shared/types';
import { defineInterface } from '@directus/shared/utils';
import InterfaceComponent from './interface.vue';
import test from './test.vue';

export default defineInterface({
	id: 'grid-area',
	name: 'Grid Area',
	icon: 'box',
	description: 'Grid Area Interface',
	component: InterfaceComponent,
	types: ['string'],
	localTypes: ['group'],
	group: 'group',
	options: test
	// options: ({ field }) => {
	// 	const textOptions: { standard: DeepPartial<Field>[]; advanced: DeepPartial<Field>[] } = {
	// 		standard: [
	// 			{
	// 				field: 'columnCount',
	// 				name: '$t:column_count',
	// 				type: 'integer',
	// 				meta: {
	// 					width: 'full',
	// 					interface: 'input',
	// 					options: {
	// 						placeholder: '4',
	// 						min: 1,
	// 						max: field.schema?.max_length,
	// 					},
	// 				},
	// 			},
	// 			{
	// 				field: 'gridTemplate',
	// 				name: '$t:grid_template',
	// 				type: 'text',
	// 				meta: {
	// 					width: 'full',
	// 					interface: 'textarea',
	// 					options: {
	// 						placeholder: '1 1 1 2 2 \n 3 3 3 2 2'
	// 					},
	// 				},
	// 			},
	// 		],
	// 		advanced: [
				
	// 		]
	// 	}

	// 	return textOptions;
	// }
});

