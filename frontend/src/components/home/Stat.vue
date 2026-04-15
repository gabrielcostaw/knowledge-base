<template>
    <div class="stat">
        <div class="stat-icon">
            <i :class="icon" :style="style"></i>
        </div>
        <div class="stat-info">
            <span class="stat-title">{{ title }}</span>
            <span class="stat-value">{{ value }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Stat',
    props: [ 'title', 'value', 'icon', 'color' ],
    computed: {
        style() {
            return 'color: ' + (this.color || '#000')
        }
    }
}
</script>

<style>
    .stat {
        flex: 1;
        display: flex;
        align-items: center;
        border-radius: var(--radius);
        margin-right: 20px;
        margin-bottom: 20px;
        background-color: var(--surface);
        padding: 24px;
        box-shadow: var(--shadow);
        transition: box-shadow var(--transition), transform var(--transition);
        min-width: 200px;
    }

    .stat:hover {
        box-shadow: var(--shadow-hover);
        transform: translateY(-3px);
    }

    .stat-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 64px;
        height: 64px;
        border-radius: 16px;
        background-color: currentColor;
        opacity: 0.9;
        margin-right: 20px;
        flex-shrink: 0;
    }

    .stat-icon i {
        font-size: 2rem;
        color: white;
        opacity: 1;
    }

    .stat-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .stat-title {
        font-size: 0.85rem;
        font-weight: 600;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: var(--text-light);
        margin-bottom: 6px;
    }

    .stat-value {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--text);
        line-height: 1;
    }
</style>