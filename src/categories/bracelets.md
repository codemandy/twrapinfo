---

---


{% extends "layouts/base.html" %}

{% block head %}
<link rel="stylesheet" href="/css/blog.css">
{% include "navigation.html" %}
{% endblock %}

{% block content %}
{% for item in collections.posts %}
  {% for category in item.data.category %}
    {% if category === 'bracelets' %}
    <div class="blog__container">
      {% include "sidebar.html" %}
      <ul class="image-list-small">
        <li>
          <a href="#" style="background-image: url(/{{post.data.featuredimage}});"></a>
          <div class="details">
            <h3><a href="{{post.data.url}}"></a>{{post.data.title}}</h3>
            <p class="image-author">{{ post.data.category }}</p>
          </div>
        </li>
      </ul>
    </div>
    {% endif %}
  {% endfor %}
{% endfor %}

{% endblock %}