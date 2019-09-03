import Composer from 'discourse/models/composer';
import { getOwner } from 'discourse-common/lib/get-owner';
import showModal from 'discourse/lib/show-modal';
import PermissionType from 'discourse/models/permission-type';

export default {
  setupComponent(args, component) {
    $('#create-topic').css('display', 'none')

    var logged_in = !!Discourse.User.current()
    logged_in ? component.set('logged_in', true) : component.set('logged_in', false)

    if (typeof args.category.email_in == "string") {
      var email_in = args.category.email_in.split("|").pop()
      component.set('mailto', `mailto:${email_in}`)
    }

    var email_in_allow_strangers = args.category.email_in_allow_strangers
    if (!email_in_allow_strangers && !logged_in) {
      component.set('stranger_danger', true)
    }

    var canCreateTopicOnCategory = args.category.permission === PermissionType.FULL;
    var disable_new_topic_buttons = logged_in && !canCreateTopicOnCategory
    component.set('disable_new_topic_buttons', disable_new_topic_buttons)
    if (disable_new_topic_buttons) component.set('mailto', '#')

  },

  actions: {
    createTopic () {
      if (Discourse.User.current()) {
        getOwner(this).lookup('controller:composer').open({
          categoryId: this.category.id,
          action: Composer.CREATE_TOPIC,
          draftKey: Composer.CREATE_TOPIC
        });
      } else {
        var model = this
        showModal('login-prompt', { model })
      }
    },

    handleEmail () {
      if (this.stranger_danger) {
        var model = this
        showModal('login-prompt', { model })
      } else {
        window.location.href = this.mailto
      }
    }
  }
}
