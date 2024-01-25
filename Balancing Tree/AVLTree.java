	package structures;

	public class AVLTree <T extends Comparable<T>> implements BSTInterface<T> {
		protected BSTNode<T> root;
		private int size;

		public AVLTree() {
			root = null;
			size = 0;
		}

		public boolean isEmpty() {
			// DO NOT MODIFY
			return root == null;
		}

		public int size() {
			// DO NOT MODIFY
			return size;
		}

		public BSTNode<T> getRoot() {
			// DO NOT MODIFY
			return root;
		}
		
		public void printTree() {
			System.out.println("------------------------");
			if (root != null) root.printSubtree(0);
		}

		public boolean remove(T element) {
			// Do not need to implement this method.
			return false;
		}

		public T get(T element) {
			// Do not need to implement this method.
			return null;
		}

		public int height() {
			return height(this.root);
		}

		public int height(BSTNode<T> node) {
			// return the node height
			return node != null ? node.getHeight() : -1;
		}
		
		public void updateHeight(BSTNode<T> node) {
			// TODO: update node height to 1 + the maximal height between left and right subtree
			int left = height(node.getLeft());
			int right = height(node.getRight());
			node.setHeight((Math.max(left, right) + 1));
		}
		
		public int balanceFactor(BSTNode<T> node) {
			// TODO: compute the balance factor by substracting right subtree height by left subtree height
				int left = height(node.getLeft());
				int right = height(node.getRight());
				return (right - left);
			
		}

		public BSTNode<T> rotateLeft(BSTNode<T> node) {
			// TODO: implement left rotation algorithm
			BSTNode<T> rightLeftChild = node.getRight().getLeft();
			if (node.getParent() != null){
				AVLreplaceChild(node.getParent(), node, node.getRight());
			}
			else{
				this.root = node.getRight();
				this.root.setParent(null);
			}
			AVLsetChild(node.getRight(), 0, node);
			AVLsetChild(node, 1, rightLeftChild);
			return node.getParent();
		}
		
		public BSTNode<T> rotateRight(BSTNode<T> node) {
			// TODO: implement right rotation algorithm
			BSTNode<T> leftRightChild = node.getLeft().getRight();
			if (node.getParent() != null){
				AVLreplaceChild(node.getParent(), node, node.getLeft());
			}
			else{
				this.root = node.getLeft();
				this.root.setParent(null);
			}
			AVLsetChild(node.getLeft(), 1, node);
			AVLsetChild(node, 0, leftRightChild);
			return node.getParent();
		}

		public void AVLsetChild (BSTNode<T> parent, int LR, BSTNode<T> child){
			if (LR == 0){
				parent.setLeft(child);
			}
			else if (LR == 1){
				parent.setRight(child);
			}
			if (child != null){
				child.setParent(parent);
			}
			updateHeight(parent);
		}

		public void AVLreplaceChild (BSTNode<T> parent, BSTNode<T> currentChild, BSTNode<T> newChild){
			if (parent.getLeft() == currentChild){
				AVLsetChild(parent, 0, newChild);
			}
			else if (parent.getRight() == currentChild){
				AVLsetChild(parent, 1, newChild);
			}
		}

		// When inserting a new node, updating the height of each node in the path from root to the new node.
		// Check the balance factor of each updated height and run rebalance algorithm if the balance factor
		// is less than -1 or larger than 1 with following algorithm
		// 1. if the balance factor is less than -1
		//    1a. if the balance factor of left child is less than or equal to 0, apply right rotation
	    //    1b. if the balance factor of left child is larger than 0, apply left rotation on the left child,
		//        then apply right rotation
		// 2. if the balance factor is larger than 1
		//    2a. if the balance factor of right child is larger than or equal to 0, apply left rotation
	    //    2b. if the balance factor of right child is less than 0, apply right rotation on the right child,
		//        then apply left rotation
		public void add(T t) {
			// TODO
			BSTNode<T> node = new BSTNode<T>(t, null, null);
			if (this.root == null){
				this.root = node;
				node.setParent(null);
				size++;
			}
			else{
				BSTNode<T> curr = this.root;
				while (curr != null){
					if (node.getData().compareTo(curr.getData()) < 0 ){
						if (curr.getLeft() == null){
							curr.setLeft(node);
							node.setParent(curr);
							curr = null;
						}
						else{
							curr = curr.getLeft();
						}
					}
					else {
						if (curr.getRight() == null){
							curr.setRight(node);
							node.setParent(curr);
							curr = null;
						}
						else{
							curr = curr.getRight();
						}
					}
				}
				node = node.getParent();
				while (node != null){
					AVLrebalance(node);
					node = node.getParent();
				}	
				this.size++;
			}
			
		}



		public void AVLrebalance (BSTNode<T> node){
			updateHeight(node);
			if (balanceFactor(node) == 2){
				if (balanceFactor(node.getRight()) == -1){
					rotateRight(node.getRight());
				}
				rotateLeft(node);
			}
			else if (balanceFactor(node) == -2){
				if (balanceFactor(node.getLeft()) == 1){
					rotateLeft(node.getLeft());
				}
				rotateRight(node);
			}
		}

	}
