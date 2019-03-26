<template>
	<div>
		<h1>Simple Draggable</h1>
		<div class="draggable-wrapper">
			<!-- normal: v-bind:list='list'
			    with vuex : v-model='myList' 
			-->
			<draggable
				v-model='myList' 
				class="list-group"
				ghost-class="ghost"
				:move="checkMove"
				@end="onEnd"
			>
				<div class="list-group-item" v-for="element in myList" :key="element.id">
					{{element.name}}
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
  name: 'SimpleDraggable',
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
        { name: "Jean", id: 2 }
  		]
  	}
  },
  methods:{
  	checkMove: function(evt){
    	console.debug(evt.draggedContext.element.name, evt.draggedContext.index)
		},
		onEnd: function(evt){
    	console.debug ('newIndex:' + evt.newIndex, 'oldIndex:' + evt.oldIndex);
    	console.debug(this.list)
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
	  opacity: 0.5;
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
    cursor: move;
	}
	.list-group-item:first-child {
    border-top-left-radius: .25rem;
    border-top-right-radius: .25rem;
	}
</style>