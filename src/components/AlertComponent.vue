<template>
    <div v-if="visible" :class="[
        'flex items-center p-4 mb-4 text-sm rounded-lg',
        alertClass
    ]" role="alert">
        <svg v-if="icon" :class="['flex-shrink-0 inline w-5 h-5 mr-3', iconColor]" fill="currentColor"
            viewBox="0 0 20 20">
            <path :d="iconPath" />
        </svg>

        <span class="flex-1">{{ message }}</span>

        <button type="button" class="ml-4 text-lg font-bold leading-none focus:outline-none" @click="visible = false">
            ×
        </button>
    </div>
</template>

<script>
export default {
    name: 'Alert',
    props: {
        type: {
            type: String,
            default: 'info', // info, error, success, warning
        },
        message: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            default: 0, // en ms, 0 = pas d'auto-hide
        },
        icon: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            visible: true,
        }
    },
    computed: {
        alertClass() {
            switch (this.type) {
                case 'error':
                    return 'text-red-800 bg-red-100 border border-red-300'
                case 'success':
                    return 'text-green-800 bg-green-100 border border-green-300'
                case 'warning':
                    return 'text-yellow-800 bg-yellow-100 border border-yellow-300'
                default:
                    return 'text-blue-800 bg-blue-100 border border-blue-300'
            }
        },
        iconColor() {
            switch (this.type) {
                case 'error':
                    return 'text-red-500'
                case 'success':
                    return 'text-green-500'
                case 'warning':
                    return 'text-yellow-500'
                default:
                    return 'text-blue-500'
            }
        },
        iconPath() {
            switch (this.type) {
                case 'error':
                    return 'M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-8 1v2m0-6h.01'
                case 'success':
                    return 'M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z'
                case 'warning':
                    return 'M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.516 11.587c.75 1.336-.213 2.997-1.742 2.997H3.483c-1.529 0-2.492-1.661-1.742-2.997L8.257 3.1zM12 13h.01M12 9h.01'
                default:
                    return 'M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-8 1v2m0-6h.01'
            }
        },
    },
    mounted() {
        if (this.duration > 0) {
            setTimeout(() => {
                this.visible = false
            }, this.duration)
        }
    },
}
</script>
