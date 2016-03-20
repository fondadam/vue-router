<template>

  <div class="list-view">

    <!-- loading -->
    <div v-if="$loadingRouteData" class="loader"></div>

    <!-- loaded -->
    <ol v-if="!$loadingRouteData">
      <template v-for="item in items | orderBy 'name' -1" transition>
        <span class="publish-date">{{ item.name | onlyPublishDate }}</span>
        <li>
          <a v-link="{ name: 'post', params: { title: encodeURIComponent(item.name)}}">
            {{ item.name | onlyTitle }}
          </a>
        </li>
      </template>  
    </ol>
  </div>

</template>

<script>

  import store from '../store';
  import { onlyTitle, onlyPublishDate } from '../filters';
  export default {
    name: 'Listview',

    filters: {
      onlyTitle,
      onlyPublishDate,
    },

    data () {
      return {
        items: [],
      }
    },

    route: {
      data ({ to }) {
        const archive = to.params.archive;
        document.title = to.setting.blogTitle;
        return {
          items: store.getListByName(archive).then(items => items)
        };
      },
    }
  }

</script>

<style lang="sass">
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;
    border-left: 2px solid #F1F1F1;
  }
  .list-view {
    margin-top: 1rem;
    li {
      padding-bottom: 2rem;
      position: relative;
      white-space: nowrap;
      overflow-y: scroll;
      margin-left: 1.2rem;
      position: relative;
      &::-webkit-scrollbar {
        background: transparent;
      }

      &:last-child {
        display: inline-block;
        border-left: 2px solid #FFF;
        margin-left: -2px;
        padding-left: 1.2rem;
      }
      a {
        display: inline-block;
        margin-top: .7rem;
        font-size: 1.1rem;
        text-decoration: none;
      }
    }
  }

  .publish-date {
    font-size: .85rem;
    line-height: .8rem;
    display: block;
    position: relative;
    padding-left: 1.2rem;
    cursor: default;

    &:before {
      display: inline-block;
      position: absolute;
      width: .4rem;
      height: .4rem;
      left: -.25rem;
      content: ' ';
      border-radius: 50%;
      background-color: #ddd;

      &:hover {
        background-color: #06A7E1;
      }
    }
  }
</style>