
<template>
  <div>
    <div class="flex justify-content-between flex-wrap">
      <div class="flex mb-2">
        <Button
          label="Thêm mới"
          icon="pi pi-plus"
          class="p-button-success mr-4"
          @click="handleTranslationCreate"
        />
        <Filter v-model="filter" />
      </div>
      <div class="flex mb-2">
        <ExportData
          :header="header"
          :filter-val="fieldValue"
          :datas="handleGetExportData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import Filter from '@/components/filters/index.vue';
import ExportData from '@/components/DataExport/index.vue';

export default {
  name: 'TableToolbar',
  components: {
    Filter,
    ExportData,
  },
  props: ['handleGetExportData'],
  setup(props, context) {
    const filter = ref('');


    const header = [
      'Tên',
      'Loại',
      'Tên chi tiết',
      'Mô tả',
      'Được phân quyền',
      'Thời gian tạo',
    ];

    const fieldValue = ['name', 'guard_name', 'cn_name', 'description', 'status', 'created_at'];

    watch(filter, (newValue) => {
      context.emit('onFilter', newValue);
    });

    function handleTranslationCreate() {
      context.emit('onCreate');
    }

    return {
      filter,
      handleTranslationCreate,
      header,
      fieldValue,
    };
  },
};
</script>

<style lang="scss" scoped></style>
