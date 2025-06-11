<template>
	<section class="layout-wrapper">
		<p class="section-title">
			<span>Рассчитайте</span>
			<span class="color"> стоимость услуги</span>
		</p>

		<pre>{{ selCleaningTypes }}</pre>

		<UIDDropdown
			name="type"
			placeholder="Вид уборки"
			track-by="value"
			v-model="selCleaningTypes"
			:options="CLEANING_TYPES"
			:error="cleaningTypeField.errorMessage.value"
		/>

		<UIDDropdown
			name="place"
			placeholder="Тип помещения"
			track-by="value"
			v-model="selPlaceTypes"
			:options="PLACE_TYPES"
			:error="placeTypeField.errorMessage.value"
		/>

		<UIDInputNumber
			v-model="areaField.value.value"
			:error="areaField.errorMessage.value"
			name="area"
			placeholder="Метраж"
		/>
	</section>
</template>

<script setup lang="ts">
import { CLEANING_TYPES, PLACE_TYPES } from '@/common/constants';

import { useCalculatorForm } from '@/composables/useCalculatorForm';

const selCleaningTypes = ref<typeof CLEANING_TYPES>([]);
const selPlaceTypes = ref<typeof PLACE_TYPES>([]);

const { areaField, cleaningTypeField, handleSubmit, placeTypeField } =
	useCalculatorForm();

watchEffect(() => {
	cleaningTypeField.value.value =
		selCleaningTypes.value?.map((v) => v.name) ?? [];
});

watchEffect(() => {
	placeTypeField.value.value = selPlaceTypes.value?.map((v) => v.name) ?? [];
});
</script>

<style lang="scss" scoped>
section {
	margin-top: 50px;
}
</style>
