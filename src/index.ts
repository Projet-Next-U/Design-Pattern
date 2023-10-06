class TaskManager {
    private static instance: TaskManager;
    private tasks: Task[] = [];
  
    private constructor() {}
  
    public static getInstance(): TaskManager {
      if (!TaskManager.instance) {
        TaskManager.instance = new TaskManager();
      }
      return TaskManager.instance;
    }
  }  

abstract class TaskFactory {
    abstract createTask(description: string): Task;
  }
  
  class PersonnelTaskFactory extends TaskFactory {
    createTask(description: string): Task {
      return new PersonnelTask(description);
    }
  }
  
  class ComplexTaskFactory extends TaskFactory {
    createTask(description: string): Task {
      return new UrgentTask(description);
    }
  }
  
  interface Task {
    getDescription(): string;
  }
  
  class PersonnelTask implements Task {
    constructor(private description: string) {}
  
    getDescription(): string {
      return `Simple Task: ${this.description}`;
    }
  }
  
  class UrgentTask implements Task {
    constructor(private description: string) {}
  
    getDescription(): string {
      return `Complex Task: ${this.description}`;
    }
  }
  
  interface TaskObserver {
    update(task: Task): void;
  }
  
  class TaskSubject {
    private observers: TaskObserver[] = [];
  
    addObserver(observer: TaskObserver): void {
      this.observers.push(observer);
    }
  
    notifyObservers(task: Task): void {
      this.observers.forEach((observer) => observer.update(task));
    }
  }

  
  abstract class TaskDecorator implements Task {
    constructor(protected task: Task) {}
  
    abstract getDescription(): string;
  }
  
  class PriorityTask extends TaskDecorator {
    getDescription(): string {
      return `Priority Task: ${this.task.getDescription()}`;
    }
  }
  
  class ReminderTask extends TaskDecorator {
    getDescription(): string {
      return `Reminder Task: ${this.task.getDescription()}`;
    }
  }
  