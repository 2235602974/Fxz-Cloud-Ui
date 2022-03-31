<template>
  <div>
    <vxe-toolbar
      custom
      print
      export
      zoom
      v-show="toolbarShow"
      :refresh="{query: loadData}"
    >
      <template v-slot:buttons>
        <slot name="buttons"></slot>
      </template>
    </vxe-toolbar>
    <vxe-table
      ref="xTable"
      border
      show-header-overflow
      show-overflow
      highlight-hover-row
      resizable
      row-key
      column-key
      export-config
      :data="localDataSource"
      @sort-change="sortChangeEvent"
      :loading="localLoading"
      highlight-current-row
      height="500px"
      :tree-config="{children: 'children',expandAll: expandAllTree}"
      :keyboard-config="{isArrow: true}"
      :row-style="rowStyle"
      :cell-class-name="cellClassName"
      v-on="$listeners"
      @checkbox-change="selectChangeEvent"
      @checkbox-all="selectAllEvent"
    >
      <vxe-table-column type="checkbox" width="60" v-if="checkbox"></vxe-table-column>
      <vxe-table-column width="60" v-if="openRowDrop">
        <template>
          <span class="drag-btn">
            <i class="vxe-icon--menu"></i>
          </span>
        </template>
        <template v-slot:header>
          <vxe-tooltip v-model="showHelpTip1" content="按住后可以上下拖动排序！" enterable>
            <i class="vxe-icon--question" @click="showHelpTip1 = !showHelpTip1"></i>
          </vxe-tooltip>
        </template>
      </vxe-table-column>
      <template v-for="(column,index) in columns">
        <vxe-table-column
          :key="index"
          :field="column.field"
          :title="column.title"
          :width="column.width"
          :sortable="column.sortable || false"
          :tree-node="column.treeNode || false"
          :align="column.align||'left'"
        >
          <template slot-scope="scope">
            <span v-if="column.slot != true && !column.type">
              {{ scope.row[column.field] }}
            </span>
            <slot
              :row="scope.row"
              :text="scope.row[column.field]"
              v-else-if="column.slot"
              :name="column.field"
            >
            </slot>
            <template v-else>
              <span v-if="['input'].includes(column.type)">
                {{ scope.row[column.field] }}
              </span>
              <span v-if="['url'].includes(column.type)">
                <a :href="scope.row[column.field]" :target="column.target || '_blank'">{{ scope.row[column.prop] }}</a>
              </span>
              <span v-if="['dict'].includes(column.type)">
                <span>{{ scope.row[column.field] | dictFilter(column.options) }}</span>
              </span>
            </template>
          </template>
        </vxe-table-column>
      </template>
    </vxe-table>
    <vxe-pager
      border
      v-if="showPagination"
      size="medium"
      :loading="localLoading"
      :current-page="localPagination.currentPage"
      :page-size="localPagination.pageSize"
      :total="localPagination.total"
      :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
      @page-change="handlePageChange">
    </vxe-pager>
  </div>

</template>

<script>
import Sortable from 'sortablejs'

export default {
  name: 'VTable',
  data () {
    return {
      localDataSource: [],
      localLoading: false,
      localPagination: {
        currentPage: 1,
        pageSize: 50,
        total: 0
      }
    }
  },
  props: {
    expandAllTree: {
      type: Boolean,
      default: true
    },
    checkbox: {
      type: Boolean,
      default: false
    },
    toolbarShow: {
      type: Boolean,
      default: true
    },
    openRowDrop: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: function () {
        return []
      }
    },
    data: {
      type: Function,
      required: true
    },
    pageNum: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 50
    },
    bordered: {
      type: Boolean,
      default: true
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    selectChangeEvent: {
      type: Function,
      default: function () {
        return () => {
        }
      }
    },
    rowStyle: {
      type: Function,
      default: function () {
        return () => {
        }
      }
    },
    cellClassName: {
      type: Function,
      default: function () {
        return () => {
        }
      }
    },
    selectAllEvent: {
      type: Function,
      default: function () {
        return () => {
        }
      }
    }
  },
  methods: {
    sortChangeEvent ({ column, property, order }) {
      console.info(column, property, order, 'column, property, order')
      let orders = order
      if (order) {
        orders = order === 'desc' ? 'descend' : 'ascend'
      }
      this.loadData(this.localPagination, {}, {
        field: property,
        order: orders
      })
    },
    handlePageChange ({ currentPage, pageSize }) {
      console.log(currentPage, pageSize, 'currentPage, pageSize')
      this.loadData({ currentPage, pageSize })
    },
    loadData (pagination, filters, sorter) {
      this.localLoading = true
      let parameter = {}
      if (this.showPagination) {
        parameter = Object.assign(parameter, {
          current: (pagination && pagination.currentPage) ||
            this.localPagination.currentPage || this.pageNum,
          size: (pagination && pagination.pageSize) ||
            this.localPagination.pageSize || this.pageSize
        })
      }

      parameter = Object.assign(parameter,
        (sorter && sorter.field && {
          sortField: sorter.field
        }) || {},
        (sorter && sorter.order && {
          sortOrder: sorter.order
        }) || {}, {
          ...filters
        }
      )
      const result = this.data(parameter)
      if ((typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function') {
        result.then(r => {
          if (this.showPagination) {
            this.localPagination = Object.assign({}, this.localPagination, {
              currentPage: Number(r.current), // 返回结果中的当前分页数
              total: Number(r.total), // 返回结果中的总记录数
              pageSize: (pagination && pagination.pageSize) ||
                this.localPagination.pageSize
            })
            // 为防止删除数据后导致页面当前页面数据长度为 0 ,自动翻页到上一页
            if (r.records.length === 0 && this.localPagination.currentPage !== 1) {
              this.localPagination.currentPage--
            //  this.loadData()
              return
            }
            this.localDataSource = r.records // 返回结果中的数组数据
          } else {
            this.localDataSource = r
          }
        }).catch(err => {
          this.$message.error(err.msg)
        }).finally(_ => {
          this.localLoading = false
        })
      }
    },
    // 列拖拽
    columnDrop () {
      this.$nextTick(() => {
        const xTable = this.$refs.xTable
        this.sortable = Sortable.create(xTable.$el.querySelector('.body--wrapper>.vxe-table--header .vxe-header--row'), {
          handle: '.vxe-header--column:not(.col--fixed)',
          onEnd: ({ item, newIndex, oldIndex }) => {
            const { fullColumn, tableColumn } = xTable.getTableColumn()
            const targetThElem = item
            const wrapperElem = targetThElem.parentNode
            const newColumn = fullColumn[newIndex]
            if (newColumn.fixed) {
              // 错误的移动
              if (newIndex > oldIndex) {
                wrapperElem.insertBefore(targetThElem, wrapperElem.children[oldIndex])
              } else {
                wrapperElem.insertBefore(wrapperElem.children[oldIndex], targetThElem)
              }
              return this.$XModal.message({ message: '固定列不允许拖动！', status: 'error' })
            }
            // 转换真实索引
            const oldColumnIndex = xTable.getColumnIndex(tableColumn[oldIndex])
            const newColumnIndex = xTable.getColumnIndex(tableColumn[newIndex])
            // 移动到目标列
            const currRow = fullColumn.splice(oldColumnIndex, 1)[0]
            fullColumn.splice(newColumnIndex, 0, currRow)
            xTable.loadColumn(fullColumn)
          }
        })
      })
    },
    // 行拖拽
    rowDrop () {
      this.$nextTick(() => {
        const xTable = this.$refs.xTable
        this.sortable = Sortable.create(xTable.$el.querySelector('.body--wrapper>.vxe-table--body tbody'), {
          handle: '.drag-btn',
          onEnd: ({ newIndex, oldIndex }) => {
            console.log(newIndex, oldIndex, 'newIndex, oldIndex')
            const currRow = this.localDataSource.splice(oldIndex, 1)[0]
            this.localDataSource.splice(newIndex, 0, currRow)
            this.$emit('changeData', this.localDataSource)
          }
        })
      })
    },
    refresh (bool = false) {
      this.loadData()
    }
  },
  beforeDestroy () {
    if (this.sortable) {
      this.sortable.destroy()
    }
  },
  created () {
    this.loadData()
    this.columnDrop()
    this.rowDrop()
  }
}
</script>

<style scoped>

</style>
