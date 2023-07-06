<template>
    <nav class="grow flex justify-center">
        <ul class="flex items-center gap-16">
            <li v-for="item in [
                'About Us',
                'Find A Home',
                'Prequalify',
                'FAQs',
                'Contact',
            ]" class="py-5"
                :style="item.toLowerCase().replaceAll(' ', '-') === currentItem && 'border-bottom: 2px solid #3DBDFF'">
                <a class="smallcaps font-medium" href="#">
                    {{ item }}
                </a>
            </li>
        </ul>
    </nav>
</template>
<script setup>
const props = defineProps({
    currentItem: String
})
console.log(props.currentItem)
</script>