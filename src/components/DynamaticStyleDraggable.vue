<template>
	<div>
		<h1>Dynamatic Style Draggable</h1>
		<div class="draggable-wrapper">
			<!-- normal: v-bind:list='list'
			    with vuex : v-model='myList' 
			-->
			<draggable
				v-model='myList' 
				class="list-group dragula-container"
				ghost-class="ghost"
        handle=".handle"
				:move="checkMove"
        @choose = "onChoose"
        @end="onEnd"
			>
				<div class="list-group-item" v-bind:class="{ guTransit: element.isactive }" v-for="element in myList" :key="element.id">
					<div class="text-wrapper">{{element.name}}</div>
          <div class="btn-wrapper">
            <button class="btn-move handle">Move</button>
          </div>
				</div>
			</draggable>
		</div>
	</div>
</template>

<script>
import draggable from "vuedraggable";
//
let id = 1;

export default {
  name: 'DynamaticStyleDraggable',
  components: {
  	draggable
  },
  computed: {
    myList: {
        get() {
        	return this.list
        },
        set(value) {
        	this.list = value
        }
    }
	},
  data(){
  	return{
  		list: [
  			{ name: "Veron", id: 0 },
        { name: "Kate", id: 1 },
        { name: "Jean", id: 2}
  		]
  	}
  },
  methods:{
  	checkMove: function(evt){
    	// console.debug(evt.draggedContext.element.name, evt.draggedContext.index)
		},
    onChoose : function(evt){
      console.debug('onChoose:' , evt.oldIndex)
      // this.list[evt.oldIndex].isactive = true
      this.$set(this.list[evt.oldIndex],'isactive',true)
    },
    onEnd: function(evt){
    	console.debug ('onEnd' +' newIndex:' + evt.newIndex, 'oldIndex:' + evt.oldIndex);
    	// console.debug(this.list)
      this.list[evt.newIndex].isactive = false 
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
      height : 400px;
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
      cursor:move;
      position:fixed!important;
      margin:0!important;
      z-index:9999!important;
      opacity:.8;
      width:88px!important;
      height:54px;
      border:1px dashed #555;
  }
  
  //When drag start , set fire-item 显示为虚线框 style
  .dragula-container>.guTransit{
      opacity:1;
      width:100%;
      height:54px;
      border:1px dashed #bc49ff;
      margin:18px 0
  }

  //When drag start , set fire-item 隐藏所有子元素
  .dragula-container>.guTransit .text-wrapper{
    display:none
  }
</style>