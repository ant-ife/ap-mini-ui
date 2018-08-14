<template>
  <div>
    <div class="ap-flex-row">
      <div>Foo</div>
      <div input>
        <FormatInput
          placeholder="your card NO."
          format="{4}-{4}-{4}-{4}"
          v-model="card"
          type="digital"
        />
      </div>
    </div>
    <div class="ap-flex-row">
      <div>Foo</div>
      <div input>
        <FormatInput
        placeholder="MM / YY"
        :formatAdvanced="true"
        format="{2} / {2}"
        v-model="expire"
        type="digital"
      />
      </div>
    </div>
  </div>
</template>

<script>
import FormatInput from '..'

export default {
  components: {
    FormatInput,
  },

  data () {
    return {
      card: '',
      expire: '',
    }
  },
}
</script>
