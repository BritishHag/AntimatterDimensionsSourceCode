Vue.component("ip-multiplier-button", {
  data: function() {
    return {
      isAutobuyerOn: false
    };
  },
  watch: {
    isAutobuyerOn: function (newValue) {
      player.infMultBuyer = newValue;
    }
  },
  computed: {
    viewModel: function() {
      return infinityMultViewModel();
    }
  },
  methods: {
    update() {
      this.isAutobuyerOn = player.infMultBuyer;
    }
  },
  template:
    `<div class="l-spoon-btn-group">
      <infinity-upgrade-button
        :upgrade="viewModel"
        class="o-infinity-upgrade-btn--multiplier"
      />
      <primary-button-on-off
        v-model="isAutobuyerOn"
        text="Autobuy IP mult"
        class="l--spoon-btn-group__little-spoon o-primary-btn--small-spoon"
      />
    </div>`
});

class InfinityMultiplierViewModel extends InfinityUpgradeViewModel {
  constructor(props) {
    super(props);
  }

  get isCapped() {
    return InfinityUpgrade.ipMult.isCapped;
  }

  formatCapValue(formatter) {
    return `(Capped at ${formatter.shortenCosts(InfinityUpgrade.ipMult.capValue)} IP)`;
  }

  formatCost(formatter) {
    return `${formatter.shortenCosts(InfinityUpgrade.ipMult.cost)}x`;
  }

  get hasDynamicEffectDisplay() {
    return true;
  }

  get isBought() {
    return this.isCapped;
  }

  get isAvailable() {
    return super.isAvailable && !player.infMultBuyer;
  }
}

const infinityMultViewModel = () => new InfinityMultiplierViewModel({
  upgrade: InfinityUpgrade.ipMult,
  description: "Multiply infinity points from all sources by 2",
  formatCurrentEffect: (value, formatter) => `${formatter.shorten(value)}x`,
});