import { Component, OnInit } from "@angular/core";
import { NotificationService } from "../shared/messages/notification.service";

@Component({
	selector: "mt-not-found",
	templateUrl: "./not-found.component.html",
	styleUrls: ["./not-found.component.css"],
})
export class NotFoundComponent implements OnInit {
	constructor(private notificationService: NotificationService) {}

	ngOnInit() {}
}
