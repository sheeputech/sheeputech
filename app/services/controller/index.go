package controller

import (
	"html/template"
	"log"
	"net/http"
)

// IndexViewHandler : View Handler of top page
func IndexViewHandler(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("./views/common/templates.html", "./views/top/index.html"))

	err := t.ExecuteTemplate(w, "index.html", nil)
	if err != nil {
		log.Fatalf("template execution: %s", err)
	}
}
