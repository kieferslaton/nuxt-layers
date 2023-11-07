<template>
    <div :class="class">
        <svg v-if="social === 'facebook'" xmlns="http://www.w3.org/2000/svg" width="8" height="14.954"
            viewBox="0 0 8 14.954">
            <path id="Path_451" data-name="Path 451"
                d="M46.569,14.954h2.9V8.271h2.14l.428-2.7H49.466V3.53a1.3,1.3,0,0,1,1.416-1.185h1.251V.106l-2.239-.1c-2.14-.132-3.325,1.547-3.325,3.556V5.571H44.133v2.7h2.436Z"
                transform="translate(-44.133 0)" fill="#fff" fill-rule="evenodd" />
        </svg>
        <svg v-if="social === 'instagram'" xmlns="http://www.w3.org/2000/svg" width="16" height="15.962"
            viewBox="0 0 16 15.962">
            <path id="Path_452" data-name="Path 452"
                d="M646.505,3.723h7.37a4.335,4.335,0,0,1,4.315,4.315V15.37a4.335,4.335,0,0,1-4.315,4.315h-7.37a4.335,4.335,0,0,1-4.315-4.315V8.038a4.335,4.335,0,0,1,4.315-4.315m7.981,2.788h0a.916.916,0,1,1,0,1.833.916.916,0,1,1,0-1.833m-4.315.84h.038a4.353,4.353,0,0,1,0,8.706h-.038a4.353,4.353,0,0,1,0-8.706m0,1.489h.038a2.883,2.883,0,0,1,0,5.766h-.038a2.883,2.883,0,0,1,0-5.766M646.543,5.1h7.294a2.982,2.982,0,0,1,2.979,2.978v7.255a2.982,2.982,0,0,1-2.979,2.978h-7.294a2.982,2.982,0,0,1-2.979-2.978V8.076A2.982,2.982,0,0,1,646.543,5.1"
                transform="translate(-642.19 -3.723)" fill="#fff" fill-rule="evenodd" />
        </svg>
        <svg v-if="social === 'tiktok'" id="Group_928" data-name="Group 928" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="18.263" viewBox="0 0 16 18.263">
            <defs>
                <clipPath id="clip-path">
                    <rect id="Rectangle_548" data-name="Rectangle 548" width="16" height="18.263" fill="none" />
                </clipPath>
            </defs>
            <g id="Group_927" data-name="Group 927" clip-path="url(#clip-path)">
                <path id="Path_446" data-name="Path 446"
                    d="M13.737,3.811A4.58,4.58,0,0,1,11.712.794,5.374,5.374,0,0,1,11.633,0H8.5V12.506a2.66,2.66,0,0,1-2.66,2.66,2.737,2.737,0,0,1-1.271-.318,2.651,2.651,0,0,1,1.271-5,2.752,2.752,0,0,1,.794.119V6.789a5.375,5.375,0,0,0-.794-.079A5.812,5.812,0,0,0,0,12.506a5.74,5.74,0,0,0,2.5,4.725,6.024,6.024,0,0,0,3.335,1.032,5.77,5.77,0,0,0,5.8-5.757V5.995A5.872,5.872,0,0,0,16,7.464V4.328a3.072,3.072,0,0,1-2.263-.516"
                    fill="#fff" fill-rule="evenodd" />
            </g>
        </svg>
        <svg v-if="social === 'youtube'" xmlns="http://www.w3.org/2000/svg" width="19" height="13.747"
            viewBox="0 0 19 13.747">
            <path id="Subtraction_1" data-name="Subtraction 1"
                d="M9,12.747c-2.182,0-4-.071-5.392-.211a5.29,5.29,0,0,1-2.386-.573A2.575,2.575,0,0,1,.175,9.946,33.733,33.733,0,0,1,0,6.373,34.255,34.255,0,0,1,.175,2.8,2.58,2.58,0,0,1,1.221.8,5.269,5.269,0,0,1,3.607.21C5.229.08,7.3,0,9,0s3.713.078,5.393.21A5.166,5.166,0,0,1,16.761.8a2.6,2.6,0,0,1,1.029,2A26,26,0,0,1,18,6.373a25.693,25.693,0,0,1-.21,3.572,2.594,2.594,0,0,1-1.029,2.018,5.186,5.186,0,0,1-2.368.573C12.948,12.678,11.184,12.747,9,12.747ZM7.179,3.677V9.1l4.692-2.731Z"
                transform="translate(0.5 0.5)" fill="#fff" stroke="rgba(0,0,0,0)" stroke-miterlimit="10" stroke-width="1" />
        </svg>
    </div>
</template>
<script setup>
const props = defineProps({
    social: String,
    class: String
})
</script>
