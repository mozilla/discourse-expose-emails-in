# name: expose-emails-in
# about: Discourse plugin which exposes category emails-in in useful ways
# version: 0.0.1
# authors: Leo McArdle
# url: https://github.com/mozilla/discourse-expose-emails-in

after_initialize do
  add_to_serializer(:basic_category, :email_in, false) { object.email_in }
  add_to_serializer(:basic_category, :email_in_allow_strangers, false) { object.email_in_allow_strangers }

  module SerializerExtension
    def include_email_in?
      true
    end
  end
  CategorySerializer.include SerializerExtension
end
