<template>
    <div class="autocomplete">
        <input type="text"
            v-model="search"
            @input="onChange"
            @keydown.down="onArrowDown"
            @keydown.up="onArrowUp"
            @keydown.enter="onEnter"
        />
        <ul class="autocomplete-results" v-show="isOpen">
            <li
                v-for="(result, index) in results" :key="index"
                @click="setResult(result)"
                class="autocomplete-result"
                :class="{ 'is-active': index === arrowCounter }"
            >{{ result }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },

    destroyed() {
        document.removeEventListener('click', this.handleClickOutside);
    },

    data () {
        return {
            search: '',
            items: [
                'Apple',
                'Banana',
                'Orange',
                'Mango',
                'Pear',
                'Peach',
                'Grape',
                'Tangerine',
                'Pineapple'
            ],
            isOpen: false,
            results: [],
            arrowCounter: -1,
        }
    },

    methods: {
        filterResults() {
            this.results = this.items.filter(item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1)
        },
        
        onChange() {
            this.filterResults()
            if (this.search.length > 0) this.isOpen = true
            else this.isOpen = false
        },
        
        setResult(result) {
            this.search = result
            this.isOpen = false
        },
        
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.arrowCounter = -1
                this.isOpen = false
            }
        },
        
        onArrowDown() {
            if (this.arrowCounter < this.results.length) {
                this.arrowCounter = this.arrowCounter + 1;
            }
        },
        
        onArrowUp() {
            if (this.arrowCounter > 0) {
                this.arrowCounter = this.arrowCounter - 1;
            }
        },
        
        onEnter() {
            this.search = this.results[this.arrowCounter];
            this.arrowCounter = -1;
            this.isOpen = false;
        }
    }
}
</script>

<style>
    .autocomplete {
        position: relative;
    }

    .autocomplete-results {
        padding: 0;
        margin: 0;
        border: 1px solid #eeeeee;
        height: 120px;
        min-height: 1em;
        max-height: 6em;    
        overflow: auto;
    }

    .autocomplete-result {
        list-style: none;
        text-align: left;
        padding: 4px 2px;
        cursor: pointer;
    }

    .autocomplete-result.is-active,
    .autocomplete-result:hover {
        background-color: #4AAE9B;
        color: white;
    }
</style>