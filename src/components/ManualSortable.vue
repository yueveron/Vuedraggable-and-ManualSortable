<template>
	<div>
		<h1>Manual Sortable</h1>
		<div class="draggable-wrapper">
			<div class="list-group dragula-container">
				<div class="list-group-item" v-for="element in list" :key="element.id">
					<div class="text-wrapper">{{element.name}}</div>
          <div class="btn-wrapper">
            <button class="btn-delete" @click="clickRemoveItem">Delete</button>
            <button class="btn-move handle" @mousedown="onMouseDown">Move</button>
          </div>
				</div>
			</div>
      <div class="gu-mirror"></div>
		</div>
    
    <div>
      <button @click="clickAddItem">Add Item</button>
    </div>
    <div>
      <!-- <button @click="clickSwapItem">Swap Item</button> -->
      <p>{{this.realList}}</p>  
    </div>
	</div>
</template>

<script>
import draggable from "vuedraggable";
import util from '@/utils/util';
import sortable from '@/utils/sortable';

export default {
  name: 'ManualSortable',
  components: {},
  computed: {
    realList() {
      return this.list;
    }
	},
  props:{

  },
  data(){
  	return{
  		list: [
  			{ name: "Veron", id: 0 },
        { name: "Kate", id: 1 },
        { name: "Jean", id: 2},
        { name: "Arror", id: 3 },
        { name: "Beeek", id: 4 },
        { name: "CCCC", id: 5},
        { name: "DDDD", id: 6}
  		]
  	}
  },
  mounted(){
    var _this = this;
    sortable.init(this.$el, {
      onChange: function(evt) {
        _this.onSortableUpdate(evt.item)
      }
    })
  },
  methods:{
  	onMouseDown(evt){
      sortable.onStartDrag(evt);
    },
    
    onSortableUpdate(item){
      if(item.oldIndex == item.newIndex) return
      util.moveItemFromTo(this.realList, item.oldIndex, item.newIndex)
    },

    clickAddItem(evt){
      const newId = Math.max(Math.max.apply(null, this.realList.map(t => t.id)) + 1, 0);
      // console.debug(newId)
      const newItem = {id: newId, name : 'tom-'+newId }
      this.list.push(newItem)
    },
    clickRemoveItem(evt){
      const eleIndex = util.getEleIndex(evt.target.parentElement.parentElement);
      this.list.splice(eleIndex,1) 
    },
    clickSwapItem(evt){
       const currDragEle = this.$el.children[1].getElementsByClassName('list-group-item')[1]
       const prevEleItem = currDragEle.previousSibling;
       // console.debug(this.rootEle, currDragEle, prevEleItem)
       this.rootEle.insertBefore(currDragEle, prevEleItem);
    }    
  }
}
</script>

<style scoped lang="scss">
	.draggable-wrapper{
		width:400px;
		margin : 0 auto;
	}
	.ghost {
	  opacity: 0.8;
	  background: #c8ebfb;
	}
	.list-group {
		min-height: 20px;
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-direction: column;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
	}

	.list-group-item {
    position: relative;
    display: block;
    padding: .75rem 1.25rem;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.125);
	}
	.list-group-item {
    //cursor: move;
	}
	.list-group-item:first-child {
    border-top-left-radius: .25rem;
    border-top-right-radius: .25rem;
	}
  .list-group-item{
    margin:20px 0px;
    .text-wrapper{
      height : 100px;
    }
    .btn-wrapper{
      position:absolute;
      top:0; right:-45px;
    }
  }
  
  //
  .btn-move{
    cursor: move;
    padding:5px;
  }

  //Use for :: root dom => When drag start not select any dom
  .gu-unselectable{
    user-select:none!important
  }

  //When drag start , gu-mirror 跟随鼠标
  .gu-mirror{
      display:none;
      cursor:move;
      position:fixed!important;
      margin:0!important;
      z-index:9999!important;
      opacity:.8;
      width:88px!important;
      height:54px;
      border:1px dashed #555;
  }

  .gu-mirror.active{
    display:block;
  }
  
  //When drag start , set fire-item 显示为虚线框 style
  .dragula-container>.gu-transit{
      opacity:1;
      width:100%;
      height:54px;
      border:1px dashed #bc49ff;
      margin:18px 0
  }

  //When drag start , set fire-item 隐藏所有子元素
  .dragula-container>.gu-transit *{
    display:none
  }
</style>