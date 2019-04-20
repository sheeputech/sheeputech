package controller

import (
	"html/template"
	"net/http"
	"sheeputech/app/services/common"
)

// IndexViewHandler : View Handler of top page
func IndexViewHandler(w http.ResponseWriter, r *http.Request) {
	logger, _ := common.NewLogger()
	defer logger.Close()
	logger.Output(common.Info, "START", r)

	t := template.Must(template.ParseFiles("./views/common/templates.html", "./views/top/index.html"))
	err := t.ExecuteTemplate(w, "index.html", nil)
	if err != nil {
		// log.Fatalf("template execution: %s", err)
		logger.OutputError(common.Critical, err, r)
	}

	logger.Output(common.Info, "END", r)
}
