(function () {
  app.PhoneBook = Backbone.Model.extend({
    defaults: {
      name: "",
      phone: "",
    },
  });

  app.PhoneBookCollection = Backbone.Collection.extend({
    model: app.PhoneBook,
    localStorage: new Backbone.LocalStorage("PhoneBookData"),
  });

  app.phoneBook = new app.PhoneBookCollection();

  app.PhoneBookView = Backbone.View.extend({
    initialize: function () {
      this.model.on("change", this.render, this);
      this.model.on("destroy", this.remove, this);
    },
    tagName: "tr",
    template: _.template(template),
    events: {
      "click .edit-item": "editStart",
      "click .save-item": "editFinish",
      "click .remove-item": "destroy",
    },
    render: function () {
      this.el.innerHTML = this.template(this.model.toJSON());
      this.name = this.$el.context.querySelector("#edit-name");
      this.phone = this.$el.context.querySelector("#edit-phone");
      this.save_btn = this.$el.context.querySelector(".save-item");
      this.edit_btn = this.$el.context.querySelector(".edit-item");
      return this;
    },
    editStart: function () {
      input_toggle(this.name, this.phone, (remove = true));
      this.save_btn.classList.add("visible");
      this.edit_btn.classList.add("hidden");
    },
    editFinish: function () {
      if (this.name.value.length > 0 && this.phone.value.length >= 6) {
        let check_name = strip_tags(this.name.value),
          check_phone = strip_tags(this.phone.value);

        // Редактирование записи в базе данных. Чтобы увидеть полную картину сотрите комментарий

        /* СТЕРЕТЬ ТУТ
        $.ajax({
          url: 'phonebook/edit',
          method: 'post',
          data: {
            name: check_name,
            phone: check_phone
          },
          success: function(response) {
        */ // СТЕРЕТЬ ТУТ

        message(
          success,
          "Запись успешно изменена!",
          2000
        );
        this.model.save({
          name: check_name,
          phone: check_phone,
        });
        input_toggle(this.name, this.phone, (remove = false));
        this.save_btn.classList.remove("visible");
        this.edit_btn.classList.remove("hidden");

        /* СТЕРЕТЬ ТУТ
          },
          error: function(error) {
              message(error, 'Ошибка!', 6000);
          }
        });
        */ // СТЕРЕТЬ ТУТ

      } else {
        let text =
          '<div>Все поля должны быть заполнены.</div> \
                    <div>Телефон состоит из цифр, + и -, не менее 6 символов.</div> \
                    <div class="close">x</div>';
        message(error, text, 6000);
      }
    },
    destroy: function () {

      // Удаление записи из базы данных. Чтобы увидеть полную картину сотрите комментарий

      /* СТЕРЕТЬ ТУТ
      $.ajax({
        url: 'phonebook/delete',
        method: 'post',
        data: {
          name: this.name,
          phone: this.phone
        },
        success: function(response) {
      */ // СТЕРЕТЬ ТУТ

      message(success, "Запись успешно удалена!", 2000);
      this.model.destroy();

      /* СТЕРЕТЬ ТУТ
        },
        error: function(error) {
          message(error, 'Ошибка!', 6000);
        }
      });
      */ // СТЕРЕТЬ ТУТ
    },
  });

  app.AppView = Backbone.View.extend({
    el: "#app",
    initialize: function () {
      this.name = input_name;
      this.phone = input_phone;
      app.phoneBook.on("add", this.addOneItem, this);
      app.phoneBook.fetch();
    },
    events: {
      "click #add-item": "createNewItem",
    },
    createNewItem: function (e) {
      e.preventDefault();
      if (this.name.value.length > 0 && this.phone.value.length >= 6) {
        let check_name = strip_tags(this.name.value),
          check_phone = strip_tags(this.phone.value);

        // Добавление записи в базу данных. Чтобы увидеть полную картину сотрите комментарий

        /* СТЕРЕТЬ ТУТ
        $.ajax({
          url: 'phonebook/create',
          method: 'post',
          data: {
            name: check_name,
            phone: check_phone
          },
          success: function(response) {
        */ // СТЕРЕТЬ ТУТ

        message(
          success,
          "Запись успешно добавлена!",
          2000
        );
        app.phoneBook.create({
          name: check_name,
          phone: check_phone,
        });

        this.name.value = "";
        this.phone.value = "";

        /* СТЕРЕТЬ ТУТ
        },
        error: function(error) {
          message(error, 'Ошибка!', 6000);
        }
      });
      */ // СТЕРЕТЬ ТУТ

      } else {
        let text =
          '<div>Все поля должны быть заполнены.</div> \
                    <div>Телефон состоит из цифр, + и -, не менее 6 символов.</div> \
                    <div class="close">x</div>';
        message(error, text, 6000);
      }
    },
    addOneItem: function (PhoneBookModel) {
      var view = new app.PhoneBookView({
        model: PhoneBookModel,
      });
      table.appendChild(view.render().el);
    },
  });

  Backbone.history.start();
  app.appView = new app.AppView();
})();
