<template>
	<div 
		class="grid-area"
		:class="(gridTemplate) ? 'template' : ''"
		:style="`--grid-template: ${gridTemplate};--grid-columns: ${columnCount}`"
		>

		<component v-if="gridTemplate" is="style">
			{{ generateGridTemplate() }}
		</component>

		<v-text-overflow text="Gird Area"/>
		<v-form
			:initial-values="initialValues"
			:primary-key="primaryKey"
			:fields="fields"
			:model-value="values"
			:group="field.meta.field"
			:validation-errors="validationErrors"
			:loading="loading"
			:batch-mode="batchMode"
			@update:model-value="$emit('apply', $event)"
		/>
	</div>		
</template>

<script lang="ts">
import { Field } from '@directus/shared/types';
import { defineComponent, PropType, ref, computed, inject } from 'vue';
import { ValidationError } from '@directus/shared/types';
import { render } from 'micromustache';
import { useI18n } from 'vue-i18n';
export default defineComponent({
	name: 'InterfaceGroupDetail',
	props: {
		field: {
			type: Object as PropType<Field>,
			required: true,
		},
		fields: {
			type: Array as PropType<Field[]>,
			required: true,
		},
		values: {
			type: Object as PropType<Record<string, unknown>>,
			required: true,
		},
		initialValues: {
			type: Object as PropType<Record<string, unknown>>,
			required: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		batchMode: {
			type: Boolean,
			default: false,
		},
		batchActiveFields: {
			type: Array as PropType<string[]>,
			default: () => [],
		},
		primaryKey: {
			type: [Number, String],
			required: true,
		},
		loading: {
			type: Boolean,
			default: false,
		},
		validationErrors: {
			type: Array as PropType<ValidationError[]>,
			default: () => [],
		},
		columnCount: {
			type: Number
		},
		gridTemplate: {
			type: String
		}
	},
	emits: ['apply'],
	setup(props) {
		const { t } = useI18n();
		const internalActive = ref<boolean>(false);
		const values = inject('values', ref<Record<string, any>>({}));
		const generateGridTemplate = function() {
			let areas = props.gridTemplate?.replace(/"/gm, ' ').split(' ').filter((v, i, a) => {
				if(v === '' || v === ' ' || v == "\n") return false
				return a.indexOf(v) === i
			});

			console.log(areas)

			let styles = ''

			areas?.forEach((area, key) => {
				styles += `.grid-area .v-form .field:nth-child(${key + 1}) {
					grid-area: ${area}
				}`
			})

			return styles
		}
		return {
			t,
			generateGridTemplate,
			internalActive,
		};
	}
});
</script>

<style>

.grid-area .v-form .field {
	grid-column: auto;
}

.v-form.with-fill {
	grid-template-columns: [start] minmax(0,1fr) [half] minmax(0,1fr) [full] !important;
}
.grid-area .v-form {
	display: grid;
	grid-template-columns: repeat(var(--grid-columns), 1fr) !important;
}

.grid-area.template .v-form {
	display: grid;
	grid-template-areas: var(--grid-template);
}


</style>
