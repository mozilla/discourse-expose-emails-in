export default {
  shouldRender(args, component) {
    return args.category.email_in
  },

  setupComponent(args, component) {
    var email_in = args.category.email_in
    var email_in_allow_strangers = args.category.email_in_allow_strangers
    var stranger_message = "This category doesn't support posting via email from strangers, so please ensure you've signed up for an account and use the email address registered with it, thanks!"

    if (email_in_allow_strangers) {
      component.set('mailto', `mailto:${email_in}`)
    } else {
      if (Discourse.User.current()) {
        component.set('mailto', `mailto:${email_in}`)
      } else {
        component.set('mailto', `mailto:${email_in}?body=${encodeURIComponent(stranger_message)}`)
      }
    }
  }
}
