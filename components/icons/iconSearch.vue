<template>
    <abstractSvg :path="path" :class="css" stroke="#6B7280" />
</template>

<script>
import abstractSvg from '@/components/icons/abstractSvg'
export default {
    components: {
        abstractSvg
    },
    props: ['css'],
    data () {
        return {
            path: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        } 
    }
}
</script>
